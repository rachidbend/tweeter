import { useQuery } from '@tanstack/react-query';
import { getUserFollowers } from '../../services/apiUser';

export default function useGetFollowers({ userId, mode }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-followers', userId],
    queryFn: () => getUserFollowers(userId),
    enabled: mode === 'followers',
  });

  return {
    data,
    isLoading,
    error,
  };
}
