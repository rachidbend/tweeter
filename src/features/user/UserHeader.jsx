/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useFollow } from '../../hooks/follow/useFollow';
import { useAddFollow } from '../../hooks/follow/useAddFollow';
import { useUnfollow } from '../../hooks/follow/useUnfollow';
import { useRemoveFollow } from '../../hooks/follow/useRemoveFollow';
import toast from 'react-hot-toast';
import {
  IconEdit,
  IconUserOutline,
  IconUserUnfollowOutline,
} from '../../styles/Icons';
import { IoMdPersonAdd } from 'react-icons/io';

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

const FollowButton = styled.button`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  align-self: flex-start;
  border: 0.2rem solid var(--color-blue-100);
  border-radius: 0.4rem;
  cursor: pointer;
  padding: 0.8rem 2.4rem;
  color: var(--color-white);
  background-color: var(--color-blue-100);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin-left: auto;
  transition: background var(--transition-200), color var(--transition-200);

  &:hover {
    color: var(--color-blue-100);
    background-color: var(--color-white);
  }

  @media screen and (max-width: 450px) {
    margin: 0 auto;
  }

  &:disabled {
    cursor: no-drop;
  }
`;

const FollowIcon = styled(IoMdPersonAdd)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
`;

const UnfollowIcon = styled(IconUserUnfollowOutline)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
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
function UserHeader({
  currentUser,
  userProfile,
  isProfile = false,
  handleEdit,
}) {
  // Hooks for following and unfollowing users
  //  hooks that effect the current user
  const { follow, isPending: isFollowing, error: followError } = useFollow();
  const { unfollow, isPending: isUnfollowing } = useUnfollow();
  // hooks that effect the user being displayed
  const { addFollow, isPending: isAddingFollow } = useAddFollow();
  const { removeFollow, isPending: isRemovingFollow } = useRemoveFollow();

  // Function to handle following a user
  function handleFollow() {
    // Prevent the current user from following themselves
    if (currentUser.id === userProfile.id) {
      toast(`you can't follow yourself!`);
      return;
    }
    // Add the user to the current user's following list
    follow({ newFollowing: userProfile.id });
    // Notify the followed user that they have a new follower
    addFollow({ targetId: userProfile.id, followerId: currentUser.id });
  }

  // Function to handle unfollowing a user
  function handleUnfollow() {
    // Remove the user from the current user's following list
    unfollow({ unfollowId: userProfile.id });
    // Notify the unfollowed user that they have lost a follower
    removeFollow({ targetId: userProfile.id, followerId: currentUser.id });
  }

  // Check if the current user is following the user
  const isFollowingUser = currentUser.following.includes(userProfile.id);

  return (
    <StyledUserHeader>
      {/* Display the user's avatar or a placeholder */}
      {userProfile.avatar_image ? (
        <UserAvatar src={userProfile.avatar_image} />
      ) : (
        <UserAvatarPlaceHolder />
      )}

      <InfoContainer>
        <UserAndStatContainer>
          {/* Display the user's name */}
          <UserName>{userProfile.user_name}</UserName>
          <StatContainer>
            {/* Display the number of people the user is following */}
            <Stat>
              {userProfile.following.length}
              <StatSpan>Following</StatSpan>
            </Stat>
            {/* Display the number of followers the user has */}
            <Stat>
              {userProfile.followers.length}
              <StatSpan>Followers</StatSpan>
            </Stat>
          </StatContainer>
        </UserAndStatContainer>
        {/* Display the user's description or a default message */}
        <Description>
          {userProfile.user_description
            ? userProfile.user_description
            : 'This user has not added a description yet!'}
        </Description>
      </InfoContainer>
      {/* Display a button to follow/unfollow the user */}
      {!isProfile && (
        <FollowButton
          disabled={
            isUnfollowing || isFollowing || isRemovingFollow || isAddingFollow
          }
          onClick={isFollowingUser ? handleUnfollow : handleFollow}
        >
          {/* Display an icon based on whether the user is followed */}
          {isFollowingUser ? <UnfollowIcon /> : <FollowIcon />}
          {/* Display text based on whether the user is followed */}
          {isFollowingUser ? 'Unfollow' : 'Follow'}
        </FollowButton>
      )}

      {isProfile && (
        <EditButton onClick={handleEdit}>
          <EditIcon /> Edit Profile
        </EditButton>
      )}
    </StyledUserHeader>
  );
}

export default UserHeader;
