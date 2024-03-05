import { useMutation, useQueryClient } from '@tanstack/react-query';
import { retweet as retweetApi } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';
import { useGetUserData } from '../user/useGetUserData';
import toast from 'react-hot-toast';

export function useRetweet() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userProfile } = useGetUserData(user.id);
  const {
    mutate: retweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ newTweet, tweet }) =>
      retweetApi({
        newTweet,
        oldTweets: userProfile.tweets,
        tweet,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile']);
    },
    onSuccess: () => {
      toast.success('retweeted successfully!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { retweet, isPending, error };
}
