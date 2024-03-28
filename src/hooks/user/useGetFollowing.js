import { useQuery } from '@tanstack/react-query';
import { getUserFollowing } from '../../services/apiUser';

export default function useGetFollowing({ userId, mode }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-following', userId],
    queryFn: () => getUserFollowing(userId),
    enabled: mode === 'following',
  });

  return {
    data,
    isLoading,
    error,
  };
}
