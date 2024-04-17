import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTweetFromBookmarks } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import { useGetUserData } from '../../user/useGetUserData';
import toast from 'react-hot-toast';

export function useRemoveTweetFromBookmarks() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userProfile } = useGetUserData(user.id);
  const {
    mutate: removeFromSaves,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ tweet }) =>
      removeTweetFromBookmarks({
        oldBookmarks: userProfile.bookmarks,
        tweet,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile', user.id]);
    },

    onError: error => {
      toast.error(error.message);
    },
  });

  return { removeFromSaves, isPending, error };
}
