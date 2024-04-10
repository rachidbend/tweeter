import styled from 'styled-components';
import Nav from './Nav';
import UserHeader from './UserHeader';
import { Link } from 'react-router-dom';

const StyledHeader = styled.div`
  position: fixed;
  height: 6.831rem;
  top: 0;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;

  z-index: 999;

  padding: 0rem 8rem 0rem 7.2rem;
  background-color: var(--color-white);
  box-shadow: var(--shadow-200);

  @media screen and (max-width: 450px) {
    padding: 0rem 1.664rem 0rem 1.606rem;
    box-shadow: var(--shadow-200);
  }
`;

const HomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = styled.img`
  @media screen and (max-width: 450px) {
    display: none;
  }
`;
const MobileLogo = styled.img`
  display: none;
  @media screen and (max-width: 450px) {
    display: block;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <HomeLink to={'/home'}>
        <Logo src="/images/tweeter.svg" alt="Tweeter logo" />
        <MobileLogo src="/images/tweeter-small.svg" alt="Tweeter logo" />
      </HomeLink>

      <Nav />
      <UserHeader />
    </StyledHeader>
  );
}

export default Header;
