import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTweet as removeTweetApi } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';
import { useGetUserData } from '../user/useGetUserData';
import toast from 'react-hot-toast';

export function useRemoveTweet() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userProfile } = useGetUserData(user.id);
  const {
    mutate: removeTweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ tweetId }) =>
      removeTweetApi({
        oldTweets: userProfile.tweets,
        tweetId,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onSuccess: () => {
      toast.success('removed retweet');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    removeTweet,
    isPending,
    error,
  };
}
