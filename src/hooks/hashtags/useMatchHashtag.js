import { useQuery } from '@tanstack/react-query';
import { getMatchingHashtags } from '../../services/apiHashtag';

export default function useMatchHashtag(query) {
  const {
    data: matchingHashtags,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['hashtag_query', query],
    queryFn: () => getMatchingHashtags(query),
    enabled: query !== '' || query !== undefined || query !== null,
  });

  return { matchingHashtags, isLoading, error };
}
