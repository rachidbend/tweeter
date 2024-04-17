import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyUserOfRetweetRemove as notifyUserOfRetweetRemoveApi } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import toast from 'react-hot-toast';

export function useNotifyUserOfRetweetRemove() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    mutate: notifyUserOfUnretweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, tweetId }) =>
      notifyUserOfRetweetRemoveApi({
        targetId: targetId,
        tweetId: tweetId,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile']);
    },

    onError: error => {
      toast.error(error.message);
    },
  });

  return { notifyUserOfUnretweet, isPending, error };
}
