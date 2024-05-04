import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../services/apiAuth';

export default function useForgotPassword() {
  const {
    mutate: requestForgotPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email }) => forgotPassword(email),
  });

  return { requestForgotPassword, isPending, error };
}
