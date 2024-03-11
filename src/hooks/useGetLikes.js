import { useQuery } from '@tanstack/react-query';
import { getLikedTweets } from '../services/apiTweet';

export function useGetLikes(userId) {
  const {
    data: likedTweets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['likes', userId],
    queryFn: () =>
      getLikedTweets({
        userId: userId,
      }),
  });

  return { likedTweets, isLoading, error };
}
