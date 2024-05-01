import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { signup as signupApi } from '../../services/apiAuth';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signup,
    isPending: isSigningUp,
    error: signupError,
  } = useMutation({
    mutationFn: ({ email, password }) => signupApi({ email, password }),
    onSuccess: () => {
      navigate('/confirm-email');
      queryClient.invalidateQueries(['user']);
      toast.success('Signup successful!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { signup, isSigningUp, signupError };
}
