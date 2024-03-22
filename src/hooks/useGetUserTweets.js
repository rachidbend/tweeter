import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserTweets } from '../services/apiTweet';

export default function useGetUserTweets({ userId, filter }) {
  const {
    data: userTweets,
    isLoading,
    error,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['user_tweets', filter, userId],
    queryFn: ({ pageParam }) => getUserTweets({ userId, pageParam, filter }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage === null) {
        return undefined;
      }

      return lastPage;
    },
  });

  return { userTweets, isLoading, error, fetchNextPage, isFetching };
}
