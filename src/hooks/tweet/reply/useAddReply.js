import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReply as addReplyApi } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import toast from 'react-hot-toast';

export function useAddReply() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    mutate: addReply,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ originalTweet, content, replyImage, id }) =>
      addReplyApi({ originalTweet, content, replyImage, userId: user.id, id }),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    addReply,
    isPending,
    error,
  };
}
