import { useQuery } from '@tanstack/react-query';
import { getTrendyHashtags } from '../../services/apiHashtag';

export default function useGetTrendyHashtags() {
  const {
    data: trends,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['trends'],
    queryFn: getTrendyHashtags,
  });
  return { trends, isLoading, error };
}
