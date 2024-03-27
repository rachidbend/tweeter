import { IoMdPersonAdd } from 'react-icons/io';
import styled from 'styled-components';
import { IconUserUnfollowOutline } from '../../styles/Icons';
import { useFollow } from '../../hooks/follow/useFollow';
import { useUnfollow } from '../../hooks/follow/useUnfollow';
import { useAddFollow } from '../../hooks/follow/useAddFollow';
import { useRemoveFollow } from '../../hooks/follow/useRemoveFollow';
import SmallSpinner from '../../ui/SmallSpinner';
import toast from 'react-hot-toast';
import { useGetUserData } from '../../hooks/user/useGetUserData';

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

function UserFollowButton({ currentUserId, userId }) {
  const { userProfile: currentUser, isLoading: isLoadingCurrentUser } =
    useGetUserData(currentUserId);

  // Hooks for following and unfollowing users
  //  hooks that effect the current user
  const { follow, isPending: isFollowing } = useFollow();
  const { unfollow, isPending: isUnfollowing } = useUnfollow();
  // hooks that effect the user being displayed
  const { addFollow, isPending: isAddingFollow } = useAddFollow();
  const { removeFollow, isPending: isRemovingFollow } = useRemoveFollow();

  // Function to handle following a user
  function handleFollow() {
    // Prevent the current user from following themselves
    if (currentUserId === userId) {
      toast(`you can't follow yourself!`);
      return;
    }
    // Add the user to the current user's following list
    follow({ newFollowing: userId });
    // Notify the followed user that they have a new follower
    addFollow({ targetId: userId, followerId: currentUserId });
  }

  // Function to handle unfollowing a user
  function handleUnfollow() {
    // Remove the user from the current user's following list
    unfollow({ unfollowId: userId });
    // Notify the unfollowed user that they have lost a follower
    removeFollow({ targetId: userId, followerId: currentUserId });
  }
  // Check if the current user is following the user
  const isFollowingUser = currentUser.following.includes(userId);

  if (isLoadingCurrentUser) return;

  return (
    <FollowButton
      disabled={
        isUnfollowing || isFollowing || isRemovingFollow || isAddingFollow
      }
      onClick={isFollowingUser ? handleUnfollow : handleFollow}
    >
      {/* Display an icon based on whether the user is followed */}
      {isUnfollowing || isFollowing || isRemovingFollow || isAddingFollow ? (
        <SmallSpinner />
      ) : isFollowingUser ? (
        <UnfollowIcon />
      ) : (
        <FollowIcon />
      )}
      {/* Display text based on whether the user is followed */}
      {isFollowingUser ? 'Unfollow' : 'Follow'}
    </FollowButton>
  );
}

export default UserFollowButton;
