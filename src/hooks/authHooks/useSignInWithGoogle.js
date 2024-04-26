import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGoogleAuth } from '../../services/apiAuth';

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
  });

  return { signinWithGoogle, isPending, error };
}
