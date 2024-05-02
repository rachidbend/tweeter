import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGoogleAuth } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useSignInWithGoogle() {
  const queryClient = useQueryClient();
  const {
    mutate: signinWithGoogle,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginWithGoogleAuth,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { signinWithGoogle, isPending, error };
}
