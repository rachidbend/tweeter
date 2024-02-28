import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/authHooks/useUser';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Spinner from './Spinner';

const FullPage = styled.div`
  width: 100%;
  height: 100vh;
  height: 100svh;

  background-color: var(--color-grey-600);

  display: flex;
  justify-content: center;
  align-items: center;
`;

// ProtectedRoute component ensures that only authenticated users can access certain routes.
export default function ProtectedRoutes({ children }) {
  // Initialize useNavigate hook
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { user, isLoadingUser, userError, fetchStatus, isAuthenticated } =
    useUser();

  // 2. if there is NO authenticated user, redirect to '/login'
  // Redirect to '/login' if there is NO authenticated user and loading has finished
  useEffect(
    function () {
      if (!isAuthenticated && !isLoadingUser && fetchStatus !== 'fetching') {
        navigate('/login');
      }
    },
    [isLoadingUser, fetchStatus, isAuthenticated, navigate, user]
  );

  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (userError) throw new Error(userError.message);
  if (!isAuthenticated) toast.error('You must be authenticated first!');

  if (isAuthenticated) return children;
}
