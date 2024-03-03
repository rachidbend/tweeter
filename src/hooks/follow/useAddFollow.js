// this hook adds a follow to the user that you are trying to follow, not to the current logged user

import { useMutation } from '@tanstack/react-query';
import { addFollowerToUser } from '../../services/apiFollow';
import toast from 'react-hot-toast';

export function useAddFollow() {
  const {
    data,
    mutate: addFollow,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ targetId, followerId }) =>
      addFollowerToUser({ targetId, followerId }),
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    data,
    addFollow,
    isPending,
    error,
  };
}
