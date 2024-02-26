import styled from 'styled-components';
import { FaCircleUser } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';
import { FaUserGroup } from 'react-icons/fa6';
import { MdExitToApp } from 'react-icons/md';
import { motion } from 'framer-motion';

const StyledUserDropDown = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 6.27rem;

  background-color: var(--color-white);
  border: 0.1rem solid var(--color-grey-500);
  border-radius: 1.2rem;
  padding: 1.527rem 1.392rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.593rem;
  padding-bottom: 1.33rem;
  border-bottom: 0.1rem solid var(--color-grey-500);
`;

const Item = styled.li`
  list-style: none;
  font-size: 1.2rem;
  font-weight: 500;
  font-family: var(--font-noto);
  width: 16.412rem;
  color: var(--color-grey-200);
  padding: 1.067rem 0 1.248rem 1.168rem;
  text-transform: capitalize;
  border-radius: 0.8rem;
  transition: background 0.3s ease, color 0.3s ease;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  &:hover {
    background-color: var(--color-grey-600);
    color: var(--color-grey-100);
  }
`;

const Logout = styled.button`
  background-color: transparent;
  padding: 1.067rem 0 1.248rem 1.168rem;
  width: 16.412rem;
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  text-align: left;
  border: none;
  text-transform: capitalize;
  border-radius: 0.8rem;
  letter-spacing: -0.035em;
  transition: background 0.3s ease;
  margin-top: 1.311rem;
  color: var(--color-red-100);
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
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

function UserDropDown() {
  return (
    <StyledUserDropDown
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 1,
      }}
      exit={{
        opacity: 0,
        y: -30,
      }}
    >
      <List>
        <Item>
          <ProfileIcon /> my profile
        </Item>
        <Item>
          <ChatIcon /> group chat
        </Item>
        <Item>
          <SettingsIcon /> settings
        </Item>
      </List>
      <Logout>
        <LogoutIcon /> logout
      </Logout>
    </StyledUserDropDown>
  );
}

export default UserDropDown;
