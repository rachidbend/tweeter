import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTweet as addTweetAPI } from '../../services/apiTweet';
import { useGetTweets } from './useGetTweets';
import toast from 'react-hot-toast';
import { useUser } from '../authHooks/useUser';

export function useAddTweet() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { tweets } = useGetTweets();
  const {
    mutate: addTweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: newTweet =>
      addTweetAPI({
        oldTweets: tweets.at(0).tweets,
        newTweet,
        userId: user.id,
      }),
    onSuccess: () => {
      // toast.success('tweeted successfuly!');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['my_tweets']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { addTweet, isPending, error };
}
