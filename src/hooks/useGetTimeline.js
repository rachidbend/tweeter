import { useQuery } from '@tanstack/react-query';
import { useUser } from './authHooks/useUser';
import { getUserTimeline } from '../services/apiTweet';

export function useGetTimeline() {
  const { user } = useUser();

  const {
    data: timeline,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['timeline', user.id],
    queryFn: () => getUserTimeline(user.id),
  });

  return {
    timeline,
    isLoading,
    error,
  };
}
