import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyUserOfSave as notifyUserOfSaveApi } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';
import toast from 'react-hot-toast';

export function useNotifyUserOfSave() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    mutate: notifyUserOfSave,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, tweetId }) =>
      notifyUserOfSaveApi({ targetId, tweetId, userId: user.id }),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onSuccess: () => {
      toast.success('notifyed the publisher of the tweet save to the tweet!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { notifyUserOfSave, isPending, error };
}
