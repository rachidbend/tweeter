import { useQuery } from '@tanstack/react-query';
import { searchMedia as searchMediaApi } from '../../services/apiSearch';

export function useSearchMedia({ executeSearch, filter, searchQuery }) {
  const {
    isLoading,
    error,
    data: mediaData,
  } = useQuery({
    queryKey: ['search-media', filter, searchQuery],
    queryFn: () => searchMediaApi({ executeSearch, filter, searchQuery }),
    enabled: executeSearch && filter === 'media',
  });

  return { mediaData, isLoading, error };
}
