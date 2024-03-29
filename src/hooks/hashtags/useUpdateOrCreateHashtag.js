import { useMutation } from '@tanstack/react-query';
import { updateOrCreateHashtag as updateOrCreateHashtagApi } from '../../services/apiHashtag';
import toast from 'react-hot-toast';

export default function useUpdateOrCreateHashtag() {
  const {
    mutate: updateOrCreateHashtag,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: ({ hashtag, tweetId, publisherId }) =>
      updateOrCreateHashtagApi({ hashtag, tweetId, publisherId }),
    onSuccess: () => {
      toast.success('created or updated hashtag successfully');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    updateOrCreateHashtag,
    isPending,
    error,
    data,
  };
}
