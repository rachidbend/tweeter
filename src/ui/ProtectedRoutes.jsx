import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/authHooks/useUser';
import toast from 'react-hot-toast';

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  const { user, isLoadingUser, userError, fetchStatus, isAuthenticated } =
    useUser();

  useEffect(
    function () {
      if (isLoadingUser || fetchStatus == 'isFetching' || !isAuthenticated) {
        navigate('/login');
      }
    },
    [isLoadingUser, fetchStatus, isAuthenticated, navigate, user]
  );

  if (isLoadingUser) return <p>loading user</p>;
  if (userError) throw new Error(userError.message);
  if (!isAuthenticated) toast.error('You must be authenticated first!');

  if (isAuthenticated) return children;
}
