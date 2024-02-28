import { useQuery } from '@tanstack/react-query';
import { getTweets } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';

export function useGetTweets() {
  const { user } = useUser();

  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['my_tweets'],
    queryFn: () => getTweets(user?.id),
  });
  return { tweets, isLoading, error };
}
