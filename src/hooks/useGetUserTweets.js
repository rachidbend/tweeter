import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserTweets } from '../services/apiTweet';

export default function useGetUserTweets({ userId, filter, isBookmark }) {
  const {
    data: userTweets,
    isLoading,
    error,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [
      'user_tweets',
      isBookmark ? 'bookmarkPage' : 'otherPages',
      filter,
      userId,
    ],
    queryFn: ({ pageParam }) =>
      getUserTweets({
        userId: userId,
        filter: filter,
        isBookmark: isBookmark,
        pageParam,
      }),
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
