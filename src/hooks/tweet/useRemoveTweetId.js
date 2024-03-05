import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeRetweetId as removeRetweetIdApi } from '../../services/apiTweet';
import { useUser } from '../authHooks/useUser';
import useGetRetweetsIds from './useGetRetweetsIds';
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
        oldRetweets: retweetIds,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile']);
    },
    onSuccess: () => {
      toast.success('removed the tweet from the retweets list');
    },
  });

  return {
    removeRetweetId,
    isPending,
    error,
  };
}
