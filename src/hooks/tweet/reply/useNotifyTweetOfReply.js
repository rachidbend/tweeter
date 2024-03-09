import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyOriginalTweetOfReply as notifyOriginalTweetOfReplyApi } from '../../../services/apiTweet';
import toast from 'react-hot-toast';

export default function useNotifyTweetOfReply() {
  const queryClient = useQueryClient();

  const {
    mutate: notifyOriginalTweetOfReply,
    isPending,
    error,
  } = useMutation({
    mutationFn: (tweet_id, tweeter_id, reply_id, replyer_id) =>
      notifyOriginalTweetOfReplyApi(tweet_id, tweeter_id, reply_id, replyer_id),
    onSettled: () => {
      queryClient.invalidateQueries(['profiles']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    notifyOriginalTweetOfReply,
    isPending,
    error,
  };
}
