import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../hooks/authHooks/useUser';
import { useGetUserData } from '../hooks/user/useGetUserData';
import Spinner from '../ui/Spinner';
import { IconSave } from '../styles/Icons';

const StyledSettings = styled.div`
  /* min-height: 100vh; */
  /* min-height: 100svh; */
  margin-top: 2.5rem;
  width: min(var(--content-max-width), 100% - var(--page-padding-large) * 2);
  margin-inline: auto;

  display: grid;
  grid-template-columns: auto 1fr;

  /* gap: 2.4rem; */

  background-color: var(--color-white);
  box-shadow: var(--shadow-100);
  border: 0.1rem solid var(--color-grey-500);
  border-radius: 1.2rem;

  @media screen and (max-width: 450px) {
    width: min(100% - var(--page-padding-small) * 2);

    margin-inline: auto;
    grid-template-columns: auto;
    margin-top: 1.469rem;
  }
`;

const SideNav = styled.div`
  padding: 2.6rem 2rem;
  border-right: 0.1rem solid var(--color-grey-500);
  @media screen and (max-width: 450px) {
    margin: 0 1.4rem;
    border-right: none;
    padding: 1.4rem;
    border-bottom: 0.1rem solid var(--color-grey-500);
  }
`;

const Container = styled.div`
  padding: 2.6rem 4.8rem;
  border-radius: 1.2rem;

  @media screen and (max-width: 450px) {
    padding: 1.4rem;
  }
`;

const SideNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;

  @media screen and (max-width: 450px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const SideNavItems = styled(NavLink)`
  font-family: var(--font-poppings);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-100);
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.4rem;

  @media screen and (max-width: 450px) {
    font-size: 1.4rem;
  }

  &.active {
    background-color: var(--color-grey-500);
  }
`;

const Avatar = styled.img`
  height: 12rem;
  width: 12rem;
  border-radius: 0.8rem;
  object-fit: cover;
  object-position: center;
`;

export const SaveButton = styled.button`
  border: 0.2rem solid var(--color-blue-100);
  padding: 0.38rem 1.3rem 0.52rem 1.2rem;
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  letter-spacing: -0.035em;
  font-weight: 500;
  text-transform: capitalize;
  background-color: var(--color-blue-100);
  border-radius: 0.4rem;
  cursor: pointer;
  /* margin-left: auto; */
  color: var(--color-white);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  transition: color var(--transition-200), background var(--transition-200);

  &:hover {
    color: var(--color-blue-100);
    background-color: transparent;

    span {
      border: 0.2rem solid var(--color-blue-100);
      border-bottom-color: var(--color-white);
    }
  }
`;

export const SaveIcon = styled(IconSave)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
`;

const Title = styled.h2`
  font-family: var(--font-poppings);
  font-size: 2.4rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  text-transform: capitalize;
  color: var(--color-grey-200);
  grid-column: 1 / -1;
  padding: 2.6rem;
  border-bottom: 0.1rem solid var(--color-grey-500);
  @media screen and (max-width: 450px) {
    font-size: 2rem;
    margin: 0 1.4rem;
    padding: 2.6rem calc(2.6rem - 1.4rem);
  }
`;

function Settings() {
  const { user, isLoadingUser } = useUser();
  const { userProfile, isLoading, error } = useGetUserData(user.id);

  // const { avatar_image } = userProfile;

  if (isLoading) return <Spinner />;

  return (
    <StyledSettings>
      <Title>Settings</Title>
      <SideNav>
        <SideNavList>
          <SideNavItems to="/settings/account">Account</SideNavItems>
          <SideNavItems to="/settings/preferences">preferences</SideNavItems>
        </SideNavList>
      </SideNav>
      <Container>
        <Outlet />
      </Container>
    </StyledSettings>
  );
}

export default Settings;
