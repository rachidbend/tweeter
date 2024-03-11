import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyUserOfLike as notifyUserOfLikeApi } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import toast from 'react-hot-toast';

export function useNotifyUserOfLike() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    mutate: notifyUserOfLike,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, tweetId }) =>
      notifyUserOfLikeApi({ targetId, tweetId, userId: user.id }),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onSuccess: () => {
      toast.success('notifyed the publisher of the tweet like to the tweet!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { notifyUserOfLike, isPending, error };
}
