import { useQuery } from '@tanstack/react-query';
import { searchAccounts as searchAccountsApi } from '../../services/apiSearch';

export function useSearchAccounts({ executeSearch, filter, searchQuery }) {
  const {
    isLoading,
    error,
    data: accountsData,
  } = useQuery({
    queryKey: ['search-people', filter, searchQuery],
    queryFn: () => searchAccountsApi({ executeSearch, filter, searchQuery }),
    enabled: executeSearch && filter === 'people',
  });

  return { accountsData, isLoading, error };
}
