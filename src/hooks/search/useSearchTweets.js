import { useInfiniteQuery } from '@tanstack/react-query';
import { searchTweets as searchQueryApi } from '../../services/apiSearch';

export function useSearchTweets({ executeSearch, filter, searchQuery }) {
  const {
    data: tweetsData,
    isLoading,
    error,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['search-tweets', filter, searchQuery],
    queryFn: ({ pageParam }) =>
      searchQueryApi({ searchQuery, filter, pageParam }),
    enabled:
      executeSearch &&
      (filter === 'top' || filter === 'latest' || filter === 'media'),
    initialPageParam: 1,
    getNextPageParam: (lastPage, lastPageParam, pages) => {
      if (lastPage === null) return undefined;
      return pages + 1;
    },
  });

  return { tweetsData, isLoading, error, fetchNextPage, isFetching };
}
