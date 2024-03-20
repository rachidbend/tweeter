import styled from 'styled-components';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useRef, useState } from 'react';
import UserDropDown from './UserDropDown';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '../hooks/authHooks/useUser';
import { useGetUserData } from '../hooks/user/useGetUserData';
import Spinner from './Spinner';
import AvatarPlaceHolder from './AvatarPlaceHolder';
import OutsideClick from '../helpers/OutsideClick';

const StyledUserHeader = styled.div`
  position: relative;
`;
const Container = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.4rem;
  background-color: transparent;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background var(--transition-100);

  &:hover {
    background-color: var(--color-grey-600);
  }
`;
const Avatar = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 0.8rem;
  overflow: hidden;

  object-fit: cover;
  object-position: center;

  @media screen and (max-width: 450px) {
    margin-right: 0;
  }
`;

const Username = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  margin-right: 1.94rem;
  margin-left: 1.1rem;
  font-weight: 700;
  color: var(--color-grey-100);
  text-transform: capitalize;
  letter-spacing: -0.035em;

  @media screen and (max-width: 450px) {
    display: none;
  }
`;
const ArrowDown = styled(TiArrowSortedDown)`
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

function UserHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoadingUser } = useUser();
  const { userProfile: currentUser, isLoading: isLoadingCurrentUser } =
    useGetUserData(user.id);

  // ref used to close the drop down if there was a click outside of it
  const userHeaderRef = useRef();

  if (isLoadingCurrentUser || isLoadingUser) return <Spinner />;
  return (
    <StyledUserHeader ref={userHeaderRef}>
      <OutsideClick
        componentRef={userHeaderRef}
        onClose={() => setIsOpen(false)}
      />
      <Container onClick={() => setIsOpen(isOpen => !isOpen)}>
        {currentUser.avatar_image ? (
          <Avatar src={currentUser.avatar_image} alt="user avatar" />
        ) : (
          <AvatarPlaceHolder width={'3.2rem'} />
        )}

        <Username>{currentUser.user_name}</Username>
        <ArrowDown />
      </Container>
      <AnimatePresence>{isOpen && <UserDropDown />}</AnimatePresence>
    </StyledUserHeader>
  );
}

export default UserHeader;
