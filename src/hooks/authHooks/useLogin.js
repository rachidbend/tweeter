import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isLogingIn,
    error: loginError,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      navigate('/home');
      queryClient.invalidateQueries(['user']);
      toast.success('Login successful!');
    },
  });

  return { login, isLogingIn, loginError };
}
