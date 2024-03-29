import { useMutation } from '@tanstack/react-query';
import { createHashtag as createHashtagApi } from '../../services/apiHashtag';

export default function useCreateHashtag() {
  const {
    mutate: createHashtag,
    isPending: isCreatingHashtag,
    error: hashtagCreationError,
  } = useMutation({
    mutationFn: ({ hashtagName }) => createHashtagApi(hashtagName),
  });

  return { createHashtag, isCreatingHashtag, hashtagCreationError };
}
