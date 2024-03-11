import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyUserOfUnlike as notifyUserOfUnlikeApi } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import toast from 'react-hot-toast';

export function useNotifyUserOfUnlike() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    mutate: notifyUserOfUnlike,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, tweetId }) =>
      notifyUserOfUnlikeApi({ targetId, tweetId, userId: user.id }),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onSuccess: () => {
      toast.success('notifyed the publisher of the tweet unlike to the tweet!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { notifyUserOfUnlike, isPending, error };
}
