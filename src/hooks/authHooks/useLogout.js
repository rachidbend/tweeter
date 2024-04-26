import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useLogout() {
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    error: logoutError,
    isPending: isLogingOut,
  } = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      queryClient.invalidateQueries();
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { logout, logoutError, isLogingOut };
}
