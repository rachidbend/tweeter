import { useMutation } from '@tanstack/react-query';
import { searchMedia as searchMediaApi } from '../../services/apiSearch';

export function useSearchMedia() {
  const {
    mutate: searchMedia,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: ({ searchQuery }) => searchMediaApi({ searchQuery }),
  });

  return { searchMedia, isPending, error, data };
}
