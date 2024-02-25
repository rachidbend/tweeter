import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.div``;

function Nav() {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link to={'/home'}>home</Link>
        </li>
        <li>
          <Link to={'/explore'}>explore</Link>
        </li>
        <li>
          <Link to={'/bookmarks'}>bookmark</Link>
        </li>
      </ul>
    </StyledNav>
  );
}

export default Nav;
