import { useQuery } from '@tanstack/react-query';
import { getIsDarkMode } from '../../services/apiDarkMode';
import { useUser } from '../authHooks/useUser';

export function useGetIsDarkMode() {
  const { user } = useUser();
  const {
    data: isDarkMode,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['isDarkMode'],
    queryFn: () => getIsDarkMode({ userId: user.id }),
    enabled: user ? true : false,
  });

  return { isDarkMode, isLoading, error };
}
