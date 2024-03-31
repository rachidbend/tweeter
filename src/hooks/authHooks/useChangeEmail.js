import { useMutation } from '@tanstack/react-query';
import { changeEmail } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useChangeEmail() {
  const {
    mutate: resetEmail,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ newEmail }) => changeEmail({ newEmail }),
    onSuccess: () => {
      toast.success('Check your email for email confirmation!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { resetEmail, isPending, error };
}
