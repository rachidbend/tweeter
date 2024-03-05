import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTweetFromLikes as removeTweetFromLikesApi } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';
import { useGetUserData } from '../user/useGetUserData';
import toast from 'react-hot-toast';

export function useRemoveTweetFromLikes() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userProfile } = useGetUserData(user.id);

  const {
    mutate: removeTweetFromLikes,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ tweet }) =>
      removeTweetFromLikesApi({
        oldlikes: userProfile.likes,
        tweet,
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

  return { removeTweetFromLikes, isPending, error };
}
