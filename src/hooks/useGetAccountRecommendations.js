import { useQuery } from '@tanstack/react-query';
import { getAccountRecommendations } from '../services/apiUser';

export default function useGetAccountRecommendations() {
  const {
    data: recommendations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['account_recomendations'],
    queryFn: getAccountRecommendations,
  });

  return { recommendations, isLoading, error };
}
