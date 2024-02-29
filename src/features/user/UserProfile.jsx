import { useParams } from 'react-router';
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';

const StyledUserProfile = styled.div`
  width: 100%;
  background-color: red;
`;

function UserProfile() {
  const { id } = useParams();
  console.log(id);

  const { userProfile, isLoading, error } = useGetUserData(id);

  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);

  console.log(userProfile);
  return <StyledUserProfile>UserProfile</StyledUserProfile>;
}

export default UserProfile;

// b9628375-9682-4879-a408-45e7e2b8b9db
