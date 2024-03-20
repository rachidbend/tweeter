import { useMutation } from '@tanstack/react-query';
import { searchAccounts as searchAccountsApi } from '../../services/apiSearch';

export function useSearchAccounts() {
  const {
    mutate: searchAccounts,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: ({ searchQuery }) => searchAccountsApi({ searchQuery }),
  });

  return { searchAccounts, isPending, error, data };
}
