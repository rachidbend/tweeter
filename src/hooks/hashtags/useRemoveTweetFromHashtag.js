import { useMutation } from '@tanstack/react-query';
import { removeTweetFromHashtag as removeTweetFromHashtagApi } from '../../services/apiHashtag';
import toast from 'react-hot-toast';

export default function useRemoveTweetFromHashtag() {
  const {
    mutate: removeTweetFromHashtag,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: ({ hashtag, tweetId, publisherId }) =>
      removeTweetFromHashtagApi({ hashtag, tweetId, publisherId }),

    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    removeTweetFromHashtag,
    isPending,
    error,
    data,
  };
}
