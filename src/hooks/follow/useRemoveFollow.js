import { useMutation } from '@tanstack/react-query';
import { removeFollowerToUser } from '../../services/apiFollow';
import toast from 'react-hot-toast';

export function useRemoveFollow() {
  const {
    mutate: removeFollow,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, followerId }) =>
      removeFollowerToUser({ targetId, followerId }),
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    removeFollow,
    isPending,
    error,
  };
}
