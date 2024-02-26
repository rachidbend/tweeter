import styled from 'styled-components';
import Nav from './Nav';
import UserHeader from './UserHeader';
import { Link } from 'react-router-dom';

const StyledHeader = styled.div`
  /* padding: 1.97rem 8rem 1.97rem 7.2rem; */
  padding: 0rem 8rem 0rem 7.2rem;
  height: 6.831rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-white);

  @media screen and (max-width: 450px) {
    padding: 0rem 1.664rem 0rem 1.606rem;
    height: 6.831rem;
    box-shadow: var(--shadow-200);
  }
`;

const HomeLink = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
        <Logo src="/images/tweeter.svg" />
        <MobileLogo src="/images/tweeter-small.svg" />
      </HomeLink>

      <Nav />
      <UserHeader />
    </StyledHeader>
  );
}

export default Header;
