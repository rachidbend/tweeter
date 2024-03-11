import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../authHooks/useUser';
import { useGetUserData } from '../../user/useGetUserData';
import { addRetweetId as addRetweetIdApi } from '../../../services/apiTweet';
import toast from 'react-hot-toast';

export function useAddRetweetId() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userProfile } = useGetUserData(user.id);
  const {
    mutate: addRetweetId,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ tweetId }) =>
      addRetweetIdApi({
        tweetId,
        oldRetweets: userProfile.retweets,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile']);
    },
    onSuccess: () => {
      toast.success('retweeted added successfully!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { addRetweetId, isPending, error };
}
