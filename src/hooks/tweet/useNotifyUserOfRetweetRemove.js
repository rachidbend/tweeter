import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyUserOfRetweetRemove as notifyUserOfRetweetRemoveApi } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';
import toast from 'react-hot-toast';

export function useNotifyUserOfRetweetRemove() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    mutate: notifyUserOfRetweetRemove,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, tweetId }) =>
      notifyUserOfRetweetRemoveApi({ targetId, tweetId, userId: user.id }),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onSuccess: () => {
      toast.success('notifyed the publisher of the retweet removal');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { notifyUserOfRetweetRemove, isPending, error };
}
