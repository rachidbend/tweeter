import { useInfiniteQuery } from '@tanstack/react-query';
import { useUser } from './authHooks/useUser';
import { getUserTimeline } from '../services/apiTweet';

export function useGetTimeline() {
  const { user } = useUser();

  const {
    data: timeline,
    isLoading,
    error,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['timeline'],
    queryFn: ({ pageParam }) => getUserTimeline({ userId: user.id, pageParam }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage === null) {
        return undefined;
      }

      return lastPage;
    },
  });

  return {
    timeline,
    isLoading,
    error,
    fetchNextPage,
    isFetching,
  };
}
