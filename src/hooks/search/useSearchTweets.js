import { useMutation } from '@tanstack/react-query';
import { searchTweets as searchQueryApi } from '../../services/apiSearch';

export function useSearchTweets() {
  const {
    mutate: searchTweets,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: searchQuery => searchQueryApi(searchQuery),
  });

  return { searchTweets, isPending, error, data };
}
