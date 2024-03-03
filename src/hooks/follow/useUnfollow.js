import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unfollowUser } from '../../services/apiFollow';
import { useUser } from '../authHooks/useUser';
import { useGetUserData } from '../user/useGetUserData';
import toast from 'react-hot-toast';

export function useUnfollow() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userProfile: currentUser } = useGetUserData(user.id);
  const {
    mutate: unfollow,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ unfollowId }) =>
      unfollowUser({
        following: currentUser.following,
        unfollowId,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { unfollow, isPending, error };
}
