import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleIsDarkMode } from '../../services/apiDarkMode';
import { useUser } from '../authHooks/useUser';
import toast from 'react-hot-toast';

export function useToggleDarkMode() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    mutate: toggleDarkMode,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ nextIsDarkMode }) =>
      toggleIsDarkMode({ userId: user.id, nextIsDarkMode }),
    onSettled: () => {
      queryClient.invalidateQueries(['isDarkMode']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { toggleDarkMode, isPending, error };
}
