import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../services/apiUser';

// custom hook to get the data of a user
export function useGetUserData(userId) {
  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile-data', userId],
    queryFn: () => getUserData(userId),
  });

  return { userProfile, isLoading, error };
}
