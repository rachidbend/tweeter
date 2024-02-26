import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { IoMdHome } from 'react-icons/io';
import { MdExplore } from 'react-icons/md';
import { FaBookmark } from 'react-icons/fa';
import { setPositionSpan } from '../helpers/functions';

const StyledMobileNav = styled.ul`
  display: none;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 6.831rem;
  padding: 0 5.122rem 0 4.778rem;
  background-color: var(--color-white);

  @media screen and (max-width: 450px) {
    display: flex;
  }
`;

const Item = styled.li`
  list-style: none;
`;

const ItemLink = styled(NavLink)`
  color: var(--color-grey-300);
  transition: color 0.3s ease;

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

const HomeIcon = styled(IoMdHome)`
  width: 2.4rem;
  height: auto;
`;
const ExploreIcon = styled(MdExplore)`
  width: 2.4rem;
  height: auto;
`;
const BookmarkIcon = styled(FaBookmark)`
  width: 2.4rem;
  height: auto;
`;

function MobileNav() {
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
    <StyledMobileNav>
      <StyledSpan layout ref={spanRef}></StyledSpan>
      <Item>
        <ItemLink ref={homeRef} to={'/home'}>
          <HomeIcon />
        </ItemLink>
      </Item>
      <Item>
        <ItemLink ref={exploreRef} to={'/explore'}>
          <ExploreIcon />
        </ItemLink>
      </Item>
      <Item>
        <ItemLink ref={bookmarksRef} to={'/bookmarks'}>
          <BookmarkIcon />
        </ItemLink>
      </Item>
    </StyledMobileNav>
  );
}

export default MobileNav;
