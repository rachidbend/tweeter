/* eslint-disable react/prop-types */
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { IconEdit, IconUserOutline } from '../../styles/Icons';
import { formatNumber } from '../../helpers/functions';
import { useUser } from '../../hooks/authHooks/useUser';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import UserFollowButton from './UserFollowButton';
import UserHeaderSkeletal from '../../ui/SkeletalUI/userProfile/UserHeaderSkeletal';
import { useState } from 'react';
import ModalWrapper from '../../ui/ModalWrapper';
import UserModal from './UserModal';

const StyledUserHeader = styled.div`
  position: relative;
  top: -5.5rem;
  margin-bottom: -3rem;
  background-color: var(--color-white);
  border-radius: 1.2rem;
  padding: 1.963rem 2.761rem 3.523rem 2rem;
  display: flex;
  box-shadow: var(--shadow-100);
  gap: 2rem;

  @media screen and (max-width: 450px) {
    width: 100%;
    flex-direction: column;
    padding-bottom: 2.3rem;
    top: -2rem;
    gap: 1.1rem;
    margin-bottom: 0rem;
  }
`;
const UserAvatar = styled.img`
  width: 16rem;
  height: 16rem;
  border-radius: 0.8rem;
  border: 0.4rem solid var(--color-white);
  box-shadow: var(--shadow-100);
  position: relative;
  top: -8.161rem; // 5.4 + 2.761
  margin-bottom: -8.161rem;
  object-fit: cover;
  object-position: center;
  background-color: var(--color-grey-500);
  @media screen and (max-width: 450px) {
    flex-direction: column;
    width: 12.243rem;
    height: 12.243rem;
    margin: 0 auto;
    top: -9.6rem;
    margin-bottom: -8.161rem;
    border: 0.3rem solid var(--color-white);
  }
`;

const UserAvatarPlaceHolder = styled(IconUserOutline)`
  display: block;
  width: ${props => (props.$width ? props.$width : '16rem')};
  height: ${props => (props.$height ? props.$height : '16rem')};
  color: var(--color-white);
  border-radius: 0.8rem;
  border: 0.4rem solid var(--color-white);
  box-shadow: var(--shadow-100);
  position: relative;
  top: -8.161rem;
  margin-bottom: -8.161rem;

  background-color: var(--color-grey-500);
  @media screen and (max-width: 450px) {
    flex-direction: column;
    width: 12.243rem;
    height: 12.243rem;
    margin: 0 auto;
    top: -9.6rem;
    margin-bottom: -8.161rem;
    border: 0.3rem solid var(--color-white);
  }
`;

const UserName = styled.p`
  font-family: var(--font-poppings);
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-100);
  letter-spacing: -0.035em;
`;

const Description = styled.p`
  font-family: var(--font-noto);
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.452rem;
  letter-spacing: -0.035em;
  color: var(--color-grey-300);
  text-align: left;
  max-width: 43rem;

  @media screen and (max-width: 450px) {
    width: 100%;
    text-align: center;
    margin-bottom: 1.3rem;
  }
`;

const InfoContainer = styled.div`
  /* width: 100%; */
`;

const UserAndStatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6rem;
  margin-bottom: 2.2rem;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;
    margin-bottom: 1.4rem;
  }
`;
const StatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;
const Stat = styled.p`
  font-family: var(--font-poppings);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-grey-100);
  letter-spacing: -0.035em;
  cursor: pointer;
`;
const StatSpan = styled.span`
  margin-left: 0.4rem;
  font-weight: 500;
  color: var(--color-grey-300);
`;

const EditButton = styled.button`
  margin-left: auto;
  align-self: flex-start;

  font-family: var(--font-noto);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  align-self: flex-start;
  border: 0.2rem solid var(--color-blue-100);
  border-radius: 0.4rem;
  cursor: pointer;
  padding: 0.8rem 2.4rem;
  color: var(--color-blue-100);
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin-left: auto;
  transition: background var(--transition-200), color var(--transition-200),
    border var(--transition-200);

  &:hover {
    color: var(--color-grey-400);
    border: 0.2rem solid var(--color-grey-400);
  }

  @media screen and (max-width: 450px) {
    margin: 0 auto;
  }
`;

const EditIcon = styled(IconEdit)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
`;

// This component displays the user's profile header
function UserHeader({ userId, isProfile = false, handleEdit }) {
  // user data
  // Fetch the current user and their loading state
  const { user, isLoadingUser } = useUser();

  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(true);
  const [userMode, setUserMode] = useState('following');

  // Fetch the current user's profile and its loading state
  const { userProfile: currentUser, isLoading: isLoadingCurrentUser } =
    useGetUserData(user.id);

  // Fetch the profile of the user specified in the URL parameters, along with its loading state and any error that occurred
  const { userProfile, isLoading, error } = useGetUserData(userId);

  function handleOpen(mode) {
    setUserMode(() => mode);
    setIsFollowingModalOpen(true);
  }

  // If any of the data is still loading, display a loading spinner
  if (isLoading || isLoadingUser || isLoadingCurrentUser)
    return <UserHeaderSkeletal />;

  // If there was an error fetching the data, display an error message
  if (error) toast.error(error.message);

  const {
    avatar_image,
    user_name,
    following_count,
    followers_count,
    user_description,
  } = userProfile;

  return (
    <StyledUserHeader>
      {/* Display the user's avatar or a placeholder */}
      {avatar_image ? (
        <UserAvatar src={avatar_image} />
      ) : (
        <UserAvatarPlaceHolder />
      )}

      <InfoContainer>
        <UserAndStatContainer>
          {/* Display the user's name */}
          <UserName>{user_name}</UserName>
          <StatContainer>
            {/* Display the number of people the user is following */}
            <Stat onClick={() => handleOpen('following')}>
              {formatNumber(following_count)}
              <StatSpan>Following</StatSpan>
            </Stat>
            {/* Display the number of followers the user has */}
            <Stat onClick={() => handleOpen('followers')}>
              {formatNumber(followers_count)}
              <StatSpan>Followers</StatSpan>
            </Stat>
          </StatContainer>
        </UserAndStatContainer>
        {/* Display the user's description or a default message */}
        <Description>
          {user_description
            ? user_description
            : 'This user has not added a description yet!'}
        </Description>
      </InfoContainer>
      {/* Display a button to follow/unfollow the user */}
      {!isProfile && (
        <UserFollowButton
          currentUserId={currentUser.id}
          userId={userProfile.id}
        />
      )}

      {isProfile && (
        <EditButton onClick={handleEdit}>
          <EditIcon /> Edit Profile
        </EditButton>
      )}
      <ModalWrapper isShowing={isFollowingModalOpen}>
        <UserModal
          userId={userId}
          mode={userMode}
          onClose={() => setIsFollowingModalOpen(false)}
        />
      </ModalWrapper>
    </StyledUserHeader>
  );
}

export default UserHeader;

// 1- click buttons to trigger the modal
// 2- each modal uses a different API or hook to get the data it needs
// - one for following: the accounts that the user is following
// - one for followers: the accounts following the user
// - both are ranked based on

// 3- each modals shows only up to 4 accounts
// 4- the api only returns 4 results
