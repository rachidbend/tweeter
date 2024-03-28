import styled from 'styled-components';
import { FaCircleUser } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';
import { FaUserGroup } from 'react-icons/fa6';
import { MdExitToApp } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useLogout } from '../hooks/authHooks/useLogout';
import { Link } from 'react-router-dom';

const StyledUserDropDown = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 6.27rem;
  padding: 1.527rem 1.392rem;
  border: 0.1rem solid var(--color-grey-500);
  border-radius: 1.2rem;
  background-color: var(--color-white);
  display: block;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.593rem;
  padding-bottom: 1.33rem;
  border-bottom: 0.1rem solid var(--color-grey-500);
`;

const Item = styled(Link)`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  width: 16.412rem;

  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-200);
  padding: 1.067rem 0 1.248rem 1.168rem;
  border-radius: 0.8rem;
  text-transform: capitalize;
  list-style: none;
  transition: background var(--transition-100), color var(--transition-100);
  text-decoration: none;
  &:hover {
    background-color: var(--color-grey-600);
    color: var(--color-grey-100);
  }
`;

const StyledLink = styled(Link)``;

const Logout = styled.button`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  width: 16.412rem;

  font-family: var(--font-noto);
  font-size: 1.2rem;
  padding: 1.067rem 0 1.248rem 1.168rem;
  font-weight: 500;
  color: var(--color-red-100);
  text-align: left;
  border: none;
  text-transform: capitalize;
  border-radius: 0.8rem;
  letter-spacing: -0.035em;
  margin-top: 1.311rem;
  background-color: transparent;
  cursor: pointer;
  transition: background var(--transition-100);

  &:hover {
    background-color: var(--color-grey-600);
  }
`;

const ProfileIcon = styled(FaCircleUser)`
  width: 2rem;
  height: auto;
`;
const ChatIcon = styled(FaUserGroup)`
  width: 2rem;
  height: auto;
`;
const SettingsIcon = styled(IoMdSettings)`
  width: 2rem;
  height: auto;
`;
const LogoutIcon = styled(MdExitToApp)`
  width: 2rem;
  height: auto;
`;

function UserDropDown({ onClose }) {
  const { logout, logoutError } = useLogout();

  if (logoutError) return <p>{logoutError.message} </p>;

  return (
    <StyledUserDropDown
      initial={{
        opacity: 0,
        y: -20,
        zIndex: 9999,
      }}
      animate={{
        opacity: 1,
        y: 1,
        zIndex: 9999,
      }}
      exit={{
        opacity: 0,
        y: -20,
        zIndex: 9999,
        transition: {
          type: 'tween',
          duration: 0.2,
        },
      }}
    >
      <List>
        <Item to="/profile" onClick={onClose}>
          <ProfileIcon /> my profile
        </Item>

        <Item onClick={onClose}>
          <ChatIcon /> group chat
        </Item>
        <Item onClick={onClose}>
          <SettingsIcon /> settings
        </Item>
      </List>
      <Logout onClick={logout}>
        <LogoutIcon /> logout
      </Logout>
    </StyledUserDropDown>
  );
}

export default UserDropDown;
