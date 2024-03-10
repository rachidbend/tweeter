import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTweet as deleteTweetApi } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';
import toast from 'react-hot-toast';

export function useRemoveTweet() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const {
    mutate: removeTweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ tweetId }) =>
      deleteTweetApi({
        tweetId,
        tweeterId: user.id,
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
