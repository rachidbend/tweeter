import { useMutation } from '@tanstack/react-query';
import { deleteImage as deleteImageApi } from '../services/apiUser';
import toast from 'react-hot-toast';

export default function useDeleteImage() {
  const {
    mutate: deleteImage,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ bucketName, imageUrl }) =>
      deleteImageApi({ bucketName, imageUrl }),
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteImage, isPending, error };
}
