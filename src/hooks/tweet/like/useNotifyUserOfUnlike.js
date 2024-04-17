import { useMutation } from '@tanstack/react-query';
import { notifyUserOfUnlike as notifyUserOfUnlikeApi } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import toast from 'react-hot-toast';

export function useNotifyUserOfUnlike() {
  const { user } = useUser();
  const {
    mutate: notifyUserOfUnlike,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, tweetId }) =>
      notifyUserOfUnlikeApi({ targetId, tweetId, userId: user.id }),

    onError: error => {
      toast.error(error.message);
    },
  });

  return { notifyUserOfUnlike, isPending, error };
}
