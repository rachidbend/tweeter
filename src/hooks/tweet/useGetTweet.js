import { useQuery } from '@tanstack/react-query';
import { getTweetById } from '../../services/apiTweet';

export function useGetTweet({ tweetId, publisherId }) {
  const {
    data: tweet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tweet', tweetId],
    queryFn: () => getTweetById({ tweetId: tweetId, publisherId: publisherId }),
  });

  return { tweet, isLoading, error };
}
