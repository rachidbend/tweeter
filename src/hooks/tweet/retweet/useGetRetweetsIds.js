import { useQuery } from '@tanstack/react-query';
import { useUser } from '../../authHooks/useUser';
import { getRetweetsIds } from '../../../services/apiTweet';

export default function useGetRetweetsIds() {
  const { user } = useUser();
  const {
    data: retweetIds,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', 'retweets'],
    queryFn: () => getRetweetsIds(user.id),
  });

  return { retweetIds, isLoading, error };
}
