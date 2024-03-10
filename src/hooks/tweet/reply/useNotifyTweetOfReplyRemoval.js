import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyOriginalTweetOfRemovedReply as notifyOriginalTweetOfRemovedReplyApi } from '../../../services/apiTweet';
import toast from 'react-hot-toast';

export default function useNotifyTweetOfReplyRemoval() {
  const queryClient = useQueryClient();

  const {
    mutate: notifyOriginalTweetOfReplyRemoval,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ originalTweetID, originalTweeterId, replyID, replyerId }) =>
      notifyOriginalTweetOfRemovedReplyApi({
        originalTweetID,
        originalTweeterId,
        replyID,
        replyerId,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    notifyOriginalTweetOfReplyRemoval,
    isPending,
    error,
  };
}
