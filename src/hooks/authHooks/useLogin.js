import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const {
    mutate: login,
    isPending: isLogingIn,
    error: loginError,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
  });

  return { login, isLogingIn, loginError };
}
