import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeTweet as likeTweetApi } from '../../../services/apiTweet';
import { useUser } from '../../authHooks/useUser';
import { useGetUserData } from '../../user/useGetUserData';
import toast from 'react-hot-toast';

export function useLikeTweet() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userProfile } = useGetUserData(user.id);

  const {
    mutate: likeTweet,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ newLike }) =>
      likeTweetApi({
        oldLikes: userProfile.likes,
        newLike,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile', user.id]);
    },
    onSuccess: () => {
      toast.success('liked the tweet!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { likeTweet, isPending, error };
}
