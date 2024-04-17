import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTweet as addTweetAPI } from '../../services/apiTweet';
import toast from 'react-hot-toast';
import { useUser } from '../authHooks/useUser';

export function useAddTweet() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    mutate: addTweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: newTweet =>
      addTweetAPI({
        newTweet,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile', user.id]);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { addTweet, isPending, error };
}
