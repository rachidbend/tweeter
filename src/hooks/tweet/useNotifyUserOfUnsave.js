import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyUserOfUnsave as notifyUserOfUnsaveApi } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';
import toast from 'react-hot-toast';

export function useNotifyUserOfUnsave() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    mutate: notifyUserOfUnsave,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, tweetId }) =>
      notifyUserOfUnsaveApi({ targetId, tweetId, userId: user.id }),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onSuccess: () => {
      toast.success('notifyed the publisher of the tweet UNSAVE to the tweet');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { notifyUserOfUnsave, isPending, error };
}
