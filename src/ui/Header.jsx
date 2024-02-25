import styled from 'styled-components';
import Nav from './Nav';
import UserHeader from './UserHeader';

const StyledHeader = styled.div``;

const Logo = styled.img``;

function Header() {
  return (
    <StyledHeader>
      <Logo src="/images/tweeter.svg" />
      <Nav />
      <UserHeader />
    </StyledHeader>
  );
}

export default Header;
