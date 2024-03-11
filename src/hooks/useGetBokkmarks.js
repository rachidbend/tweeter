import { useQuery } from '@tanstack/react-query';
import { getSavedTweets } from '../services/apiTweet';
import { useUser } from './authHooks/useUser';

export function useGetBookmarks() {
  const { user } = useUser();

  const {
    data: savedTweets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookmarks', user.id],
    queryFn: () =>
      getSavedTweets({
        userId: user.id,
      }),
  });

  return { savedTweets, isLoading, error };
}
