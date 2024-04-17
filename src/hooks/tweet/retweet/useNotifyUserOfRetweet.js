import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyUserOfRetweet as notifyUserOfRetweetApi } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import toast from 'react-hot-toast';

export default function useNotifyUserOfRetweet() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const {
    mutate: notifyUserOfRetweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, tweetId, retweetId }) =>
      notifyUserOfRetweetApi({
        targetId,
        tweetId,
        userId: user.id,
        retweetId,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile']);
    },

    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    notifyUserOfRetweet,
    isPending,
    error,
  };
}
