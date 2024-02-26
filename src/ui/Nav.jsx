import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { setPositionSpan } from '../helpers/functions';

const StyledNav = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7.2rem;
  position: relative;
  height: 100%;

  @media screen and (max-width: 450px) {
    /* this nav is not visible in mobile view */
    display: none;
  }
`;

const Item = styled.li`
  list-style: none;
`;

const ItemLink = styled(NavLink)`
  font-size: 1.4rem;
  font-family: var(--font-poppings);
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-grey-300);
  padding: 0.4rem;
  transition: color var(--transition-100);

  &:hover {
    color: var(--color-grey-100);
  }

  &.active {
    color: var(--color-blue-100);
  }
`;

const StyledSpan = styled(motion.span)`
  position: absolute;
  width: 8rem;
  height: 0.3rem;
  bottom: 0;
  left: 0;
  border-radius: 0.8rem 0.8rem 0 0;
  background-color: var(--color-blue-100);
`;

function Nav() {
  const spanRef = useRef(null);
  const homeRef = useRef(null);
  const exploreRef = useRef(null);
  const bookmarksRef = useRef(null);

  // using the location to trigger a rerendre to change the position of the span
  const location = useLocation();

  useEffect(
    function () {
      if (
        !homeRef?.current ||
        !exploreRef?.current ||
        !bookmarksRef?.current ||
        !spanRef?.current
      )
        return;

      // Create an array of all the refs
      const refs = [homeRef, exploreRef, bookmarksRef];

      // Find the ref corresponding to the active link (if any)
      const activeRef = refs.find(ref =>
        ref.current?.classList.contains('active')
      );

      // If an active link is found, update the span position
      if (activeRef) {
        setPositionSpan(spanRef, activeRef);
      }
    },
    [location]
  );

  return (
    <StyledNav>
      <StyledSpan layout ref={spanRef}></StyledSpan>
      <Item>
        <ItemLink ref={homeRef} to={'/home'}>
          home
        </ItemLink>
      </Item>
      <Item>
        <ItemLink ref={exploreRef} to={'/explore'}>
          explore
        </ItemLink>
      </Item>
      <Item>
        <ItemLink ref={bookmarksRef} to={'/bookmarks'}>
          bookmark
        </ItemLink>
      </Item>
    </StyledNav>
  );
}

export default Nav;
