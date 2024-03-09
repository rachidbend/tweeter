import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeReply as removeReplyApi } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import toast from 'react-hot-toast';

export function useRemoveReply() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    mutate: removeReply,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ replyId }) =>
      removeReplyApi({ replyId: replyId, userID: user.id }),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    removeReply,
    isPending,
    error,
  };
}
