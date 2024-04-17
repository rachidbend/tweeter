import { useMutation, useQueryClient } from '@tanstack/react-query';
import { retweet as retweetApi } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import toast from 'react-hot-toast';

export function useRetweet() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    mutate: retweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ newTweet, tweet }) =>
      retweetApi({
        newTweet,
        tweet,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile']);
    },

    onError: error => {
      toast.error(error.message);
    },
  });

  return { retweet, isPending, error };
}
