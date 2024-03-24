import { useQuery } from '@tanstack/react-query';
import { searchTweets as searchQueryApi } from '../../services/apiSearch';

export function useSearchTweets({ executeSearch, filter, searchQuery }) {
  const {
    data: tweetsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['search-tweets', filter, searchQuery],
    queryFn: () => searchQueryApi({ searchQuery, filter }),
    enabled: executeSearch && (filter === 'top' || filter === 'latest'),
  });

  return { tweetsData, isLoading, error };
}
