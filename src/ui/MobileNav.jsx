import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { IoMdHome } from 'react-icons/io';
import { MdExplore } from 'react-icons/md';
import { FaBookmark } from 'react-icons/fa';

const StyledMobileNav = styled.ul`
  display: none;
  @media screen and (max-width: 450px) {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 6.831rem;
    background-color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5.122rem 0 4.778rem;
  }
`;
const Item = styled.li`
  list-style: none;
`;
const ItemLink = styled(NavLink)`
  text-decoration: none;
  font-family: var(--font-poppings);
  font-weight: 500;
  font-size: 1.4rem;
  text-transform: uppercase;
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
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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

function setPositionSpan(spanRef, toRef) {
  // // 1. get the position of the element we want to go to
  const toRefPosition = toRef.current.offsetLeft;
  // 2. get the width of the elemnt we want to go to (to figure out where the middle of the element is)
  const toRefWidth = toRef.current.offsetWidth;

  // 3. get the width of the span itself to figure out whre it's middle is
  const spanWidth = spanRef.current.offsetWidth;

  // 4. figure out where to go, this is done in the useEffect

  // 5. change the position of the middle of the span to lighn up with the middle of the element we want to go to
  spanRef.current.style.left = `${
    toRefPosition + toRefWidth / 2 - spanWidth / 2
  }px`;
}

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
      ) {
        return;
      }

      if (homeRef.current.classList.contains('active')) {
        setPositionSpan(spanRef, homeRef);
      }
      if (exploreRef.current.classList.contains('active')) {
        setPositionSpan(spanRef, exploreRef);
      }
      if (bookmarksRef.current.classList.contains('active')) {
        setPositionSpan(spanRef, bookmarksRef);
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
