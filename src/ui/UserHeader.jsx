import styled from 'styled-components';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useState } from 'react';
import UserDropDown from './UserDropDown';
import { AnimatePresence } from 'framer-motion';

const StyledUserHeader = styled.div`
  display: flex;
  align-items: center;

  background-color: transparent;
  padding: 0.4rem;
  border-radius: 0.8rem;
  cursor: pointer;

  transition: background 0.3s ease;
  &:hover {
    background-color: var(--color-grey-600);
  }

  position: relative;
`;

const Avatar = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 0.8rem;
  overflow: hidden;
  margin-right: 1.1rem;

  @media screen and (max-width: 450px) {
    margin: 0;
  }
`;
const Username = styled.p`
  margin-right: 1.94rem;
  color: var(--color-grey-100);
  text-transform: capitalize;

  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 700;
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

  return (
    <StyledUserHeader onClick={() => setIsOpen(isOpen => !isOpen)}>
      <Avatar src="/images/avatar.jpg" alt="user image" />

      <Username>Xanthe neal</Username>
      <ArrowDown />
      <AnimatePresence>{isOpen && <UserDropDown />}</AnimatePresence>
    </StyledUserHeader>
  );
}

export default UserHeader;
