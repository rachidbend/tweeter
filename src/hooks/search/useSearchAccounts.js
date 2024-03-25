import { useInfiniteQuery } from '@tanstack/react-query';
import { searchAccounts as searchAccountsApi } from '../../services/apiSearch';

export function useSearchAccounts({ executeSearch, filter, searchQuery }) {
  const {
    isLoading,
    error,
    data: accountsData,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['search-people', filter, searchQuery],
    queryFn: ({ pageParam }) =>
      searchAccountsApi({ executeSearch, filter, searchQuery, pageParam }),
    enabled: executeSearch && filter === 'people',
    initialPageParam: 1,
    getNextPageParam: (lastPages, lastPageparam, pages) => {
      if (lastPages === null) return undefined;

      return pages + 1;
    },
  });

  return { accountsData, isLoading, error, fetchNextPage };
}
