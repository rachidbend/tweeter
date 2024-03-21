import { useInfiniteQuery } from '@tanstack/react-query';
import { useUser } from './authHooks/useUser';
import { getUserTimeline } from '../services/apiTweet';

export function useGetTimeline({ limit, lastTweetId }) {
  const { user } = useUser();

  const {
    data: timeline,
    isLoading,
    error,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['timeline'],
    queryFn: ({ pageParam }) =>
      getUserTimeline({ userId: user.id, limit, lastTweetId, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
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
