/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { IconClose } from '../../styles/Icons';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import toast from 'react-hot-toast';
import useGetFollowing from '../../hooks/user/useGetFollowing';
import UserView from '../../ui/UserView';
import useGetFollowers from '../../hooks/user/useGetFollowers';
import { useRef } from 'react';
import OutsideClick from '../../helpers/OutsideClick';
import { motion } from 'framer-motion';
import UserModalSkeletal from '../../ui/SkeletalUI/userProfile/UserModalSkeletal';

const Overlay = styled(motion.div)`
  overflow: hidden;
  width: 100%;
  background-color: var(--color-background-overlay);

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StyledUserModal = styled.div`
  min-width: 25rem;
  width: 100%;
  max-width: 63.6rem;
  margin-inline: 1.3rem;
  background-color: var(--color-white);
  border-radius: 0.8rem;
  padding: 1.2rem 2.5rem;

  overflow-y: scroll;
  max-height: 90svh;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.8rem;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid var(--color-grey-500);
`;
const Title = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  text-transform: capitalize;
  color: var(--color-grey-100);
`;
const CloseButton = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  color: var(--color-grey-100);
  transition: color var(--transition-200);

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: var(--color-blue-100);
  }
`;

const CloseIcon = styled(IconClose)`
  height: 2.4rem;
  width: 2.4rem;
  color: inherit;
`;

function UserModal({ userId, mode, onClose }) {
  // there are only two modes, 'following' and 'followers'
  // fetch the user data to display the name
  const { userProfile, isLoading, error } = useGetUserData(userId);

  const modalRef = useRef(null);
  // fetch the following or followers of the user
  const {
    data: followingData,
    isLoading: isLoadingFollowing,
    error: followingError,
  } = useGetFollowing({ userId: userId, mode: mode });

  const {
    data: followersData,
    isLoading: isLoadingFollowers,
    error: followersError,
  } = useGetFollowers({ userId: userId, mode: mode });

  if (isLoading || isLoadingFollowing || isLoadingFollowers)
    return (
      <Overlay>
        <UserModalSkeletal />
      </Overlay>
    );
  if (error) toast.error(error.message);
  if (followingError) toast.error(followingError.message);
  if (followersError) toast.error(followersError.message);

  const { user_name } = userProfile;

  return (
    <Overlay
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <OutsideClick componentRef={modalRef} onClose={onClose} />
      <StyledUserModal ref={modalRef}>
        <Header>
          <Title>
            {user_name}{' '}
            {mode === 'following'
              ? 'is following'
              : mode === 'followers'
              ? 'followers'
              : 'there was an erro'}
          </Title>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        {mode === 'following' &&
          followingData.map(id => (
            <UserView
              userId={id}
              key={`user_account-following-${id}`}
              variant={'userPage'}
            />
          ))}
        {mode === 'followers' &&
          followersData.map(id => (
            <UserView
              userId={id}
              key={`user_account-followers-${id}`}
              variant={'userPage'}
            />
          ))}
      </StyledUserModal>
    </Overlay>
  );
}

export default UserModal;
