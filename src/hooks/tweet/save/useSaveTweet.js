import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkTweet } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import { useGetUserData } from '../../user/useGetUserData';
import toast from 'react-hot-toast';

export function useSaveTweet() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userProfile } = useGetUserData(user.id);

  const {
    mutate: saveTweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ newBookmark }) =>
      bookmarkTweet({
        oldBookmarks: userProfile.bookmarks,
        newBookmark,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile', user.id]);
    },
    onSuccess: () => {
      toast.success('saved the tweet!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { saveTweet, isPending, error };
}
