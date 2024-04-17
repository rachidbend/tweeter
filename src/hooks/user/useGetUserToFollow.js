import { useQuery } from '@tanstack/react-query';
import { getUserToFollow } from '../../services/apiUser';

export default function useGetUserToFollow(userId) {
  const {
    data: userToFollow,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userToFollow', userId],
    queryFn: () => getUserToFollow({ userId: userId }),
    enabled: userId ? true : false,
    staleTime: Infinity,
  });

  return { userToFollow, isLoading, error };
}
