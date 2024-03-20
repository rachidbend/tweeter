/* eslint-disable react/prop-types */
import styled from 'styled-components';
import useGetUserToFollow from '../hooks/user/useGetUserToFollow';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import AvatarPlaceHolder from './AvatarPlaceHolder';
import { formatNumber } from '../helpers/functions';
import { useUser } from '../hooks/authHooks/useUser';
import { useGetUserData } from '../hooks/user/useGetUserData';
import { IoMdPersonAdd } from 'react-icons/io';
import { useFollow } from '../hooks/follow/useFollow';
import { useAddFollow } from '../hooks/follow/useAddFollow';
import SmallSpinner from './SmallSpinner';
import { Link } from 'react-router-dom';
import { IconUserUnfollowOutline } from '../styles/Icons';
import { useUnfollow } from '../hooks/follow/useUnfollow';
import { useRemoveFollow } from '../hooks/follow/useRemoveFollow';

const StyledUserToFollowDetails = styled.div`
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 0.8rem;
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1.7rem;
  margin-bottom: 1.9rem;
`;

const AvatarContainer = styled.div``;
const Avatar = styled.img`
  height: 4rem;
  width: 4rem;
  object-fit: cover;
  object-position: center;
  border-radius: 0.8rem;
`;

const Username = styled(Link)`
  font-family: var(--font-poppings);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-black);
  margin-bottom: 0.48rem;
  text-decoration: underline;
  text-decoration-thickness: 0.1rem;
  text-decoration-color: transparent;
  text-underline-offset: 0.4rem;
  transition: text-decoration var(--transition-200), color var(--transition-200);

  &:hover {
    text-decoration-color: var(--color-grey-400);
    color: var(--color-grey-200);
  }
`;
const FollowersStat = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;

  letter-spacing: -0.035em;
  text-align: left;
  color: var(--color-grey-300);
`;
const NumOfFollowers = styled.span``;

const Description = styled.p`
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.9rem;
  letter-spacing: -0.035em;
  color: var(--color-grey-300);
`;

// follow button
const FollowButton = styled.button`
  background-color: var(--color-blue-100);
  border: 0.2rem solid var(--color-blue-100);
  margin-left: auto;
  color: var(--color-white);
  cursor: pointer;
  padding: 0.4rem 1.3rem;
  border-radius: 0.4rem;

  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;

  letter-spacing: -0.035em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  transition: color var(--transition-200), background var(--transition-200);
  &:hover {
    background-color: var(--color-white);
    color: var(--color-blue-100);
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
// const BackgroundPlaceHolder = styled.div``;

function UserView({ userId }) {
  const { userToFollow, isLoading, error } = useGetUserToFollow(userId);
  console.log(userId);
  const { user } = useUser();
  const { userProfile: currentUser, isLoading: isLoadingCurrentUser } =
    useGetUserData(user.id);

  // If the current user is not following this recommended user, he is allowed to see them and follow them
  const { follow, isPending: isFollowing, error: followError } = useFollow();
  const {
    addFollow,
    isPending: isAddingFollow,
    error: notifyFollowError,
  } = useAddFollow();

  const {
    unfollow,
    isPending: isUnfollowing,
    error: unfollowError,
  } = useUnfollow();
  const {
    removeFollow,
    isPending: isRemovingFollow,
    error: notifyUnfollowError,
  } = useRemoveFollow();

  // Function to handle following a user
  function handleFollow() {
    // Add the user to the current user's following list
    follow({ newFollowing: userId });
    // Notify the followed user that they have a new follower
    addFollow({ targetId: userId, followerId: currentUser.id });
  }

  // Function to handle unfollowing a user
  function handleUnfollow() {
    // Remove the user from the current user's following list
    unfollow({ unfollowId: userId });
    // Notify the unfollowed user that they have lost a follower
    removeFollow({ targetId: userId, followerId: currentUser.id });
  }

  if (isLoading || isLoadingCurrentUser) return <Spinner />;
  if (error) toast.error(error.message);

  // destructuring the data needed from the user to follow data
  const { avatar_image, followers_count, user_description, user_name } =
    userToFollow;

  // If the current user is following this recommended user, he can't see this user
  const isFollowingUser = currentUser.following.includes(userId);

  if (followError) toast.error(followError.message);
  if (notifyFollowError) toast.error(notifyFollowError.message);
  if (unfollowError) toast.error(unfollowError.message);
  if (notifyUnfollowError) toast.error(notifyUnfollowError.message);

  return (
    <StyledUserToFollowDetails>
      <Header>
        <AvatarContainer>
          {avatar_image ? <Avatar src={avatar_image} /> : <AvatarPlaceHolder />}
        </AvatarContainer>
        <div>
          <Username to={`/user/${userId}`}>{user_name}</Username>
          <FollowersStat>
            <NumOfFollowers>{formatNumber(followers_count)}</NumOfFollowers>{' '}
            followers
          </FollowersStat>
        </div>
        <FollowButton onClick={isFollowingUser ? handleUnfollow : handleFollow}>
          {isFollowing ||
          isAddingFollow ||
          isUnfollowing ||
          isRemovingFollow ? (
            <SmallSpinner />
          ) : (
            <>{isFollowingUser ? <UnfollowIcon /> : <FollowIcon />}</>
          )}
          {isFollowingUser ? 'Unfollow' : 'Follow'}
        </FollowButton>
      </Header>
      <Description>
        {user_description
          ? user_description
          : 'This user did not add a description'}
      </Description>
    </StyledUserToFollowDetails>
  );
}

export default UserView;
