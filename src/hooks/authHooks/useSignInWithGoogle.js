import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGoogleAuth } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useSignInWithGoogle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: signinWithGoogle,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginWithGoogleAuth,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate('/confirm-email');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { signinWithGoogle, isPending, error };
}
