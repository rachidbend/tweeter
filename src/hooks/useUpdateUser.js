import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from './authHooks/useUser';
import { updateUser as updateUserApi } from '../services/apiUser';
import toast from 'react-hot-toast';

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    mutate: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ username, description, avatarImage, backgroundImage }) =>
      updateUserApi({
        username,
        description,
        avatarImage,
        backgroundImage,
        userID: user.id,
      }),

    onSettled: () => {
      queryClient.invalidateQueries(['profile', user.id]);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    updateUser,
    isPending,
    error,
  };
}
