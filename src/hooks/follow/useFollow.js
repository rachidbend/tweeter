// this custom hook is used so that the current user adds another user to thier following list to become a follower of that user

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser } from '../../services/apiFollow';
import { useUser } from '../authHooks/useUser';
import { useGetUserData } from '../user/useGetUserData';
import toast from 'react-hot-toast';

export function useFollow() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userProfile: currentUser } = useGetUserData(user.id);
  const {
    mutate: follow,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ newFollowing }) =>
      followUser({
        following: currentUser.following,
        followingCount: currentUser.following_count,
        newFollowing,
        userId: user.id,
      }),
    onSettled: () => {
      queryClient.invalidateQueries(['profile']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { follow, isPending, error };
}
