import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeRetweetId as removeRetweetIdApi } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';
import useGetRetweetsIds from './retweet/useGetRetweetsIds';
import toast from 'react-hot-toast';

export default function useRemoveTweetId() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { retweetIds } = useGetRetweetsIds();
  const {
    mutate: removeRetweetId,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ retweetId }) =>
      removeRetweetIdApi({
        retweetId,
        oldRetweets: retweetIds[0].retweets,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile']);
    },
  });

  return {
    removeRetweetId,
    isPending,
    error,
  };
}
