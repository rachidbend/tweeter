import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useChangePassword() {
  const {
    mutate: resetPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ newPassword }) => changePassword({ newPassword }),
    onSuccess: () => {
      toast.success('Check your email for password confirmation!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { resetPassword, isPending, error };
}
