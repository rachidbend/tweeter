import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    error: logoutError,
    isPending: isLogingOut,
  } = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return { logout, logoutError, isLogingOut };
}
