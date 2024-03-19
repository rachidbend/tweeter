/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { setPositionSpan } from '../../helpers/functions';

import { motion } from 'framer-motion';

const StyledTweetsFilter = styled(motion.ul)`
  position: relative;
  background-color: var(--color-white);
  border-radius: 0.8rem;
  box-shadow: var(--shadow-100);
  width: 100%;
  padding: 2.6rem 2rem 3.1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.9rem;
`;

const Filter = styled.button`
  background: none;
  border: none;
  text-align: left;
  font-family: var(--font-poppings);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  list-style: none;
  cursor: pointer;
  color: var(--color-grey-300);
`;

const SideBorder = styled.span`
  width: 0.3rem;
  height: 3.2rem;
  background-color: var(--color-blue-100);

  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;

  position: absolute;
  left: 0;
  top: 0;

  transition: top var(--transition-100);
`;

function SearchFilter() {
  // there are 4 filters,
  // - top tweets (most ingaged with tweets)
  // - latest (latest tweets by order of most recent)
  // - people
  // - media (tweets that include images)

  // this is what ditermines which filter is active, because only one can be active at a time, the default filter is 'tweets'
  // names of the filters, 'top', 'latest', 'people', and 'media'
  const [activeFilter, setActiveFilter] = useState('tweets');

  const spanRef = useRef();
  const topRef = useRef();
  const latestRef = useRef();
  const peopleRef = useRef();
  const mediaRef = useRef();

  useEffect(
    function () {
      if (
        !topRef.current ||
        !latestRef.current ||
        !peopleRef.current ||
        !mediaRef.current
      ) {
        return;
      }

      if (activeFilter === 'top') {
        setPositionSpan(spanRef, topRef, 'vertical');
      } else if (activeFilter === 'latest') {
        setPositionSpan(spanRef, latestRef, 'vertical');
      } else if (activeFilter === 'people') {
        setPositionSpan(spanRef, peopleRef, 'vertical');
      } else if (activeFilter === 'media') {
        setPositionSpan(spanRef, mediaRef, 'vertical');
      } else {
        setPositionSpan(spanRef, topRef, 'vertical');
      }

      /*
      if (activeFilter === 'top') {
      } else if (activeFilter === 'replies') {
      } else if (activeFilter === 'people') {
      } else if (activeFilter === 'media') {
      }
    
    */
    },
    [activeFilter]
  );

  useEffect(function () {
    setActiveFilter('top');
  }, []);

  // if (isLoading || isLoadingUser) return <Spinner />;
  // if (error) toast.error(error.message);

  return (
    <StyledTweetsFilter
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
    >
      <SideBorder ref={spanRef}></SideBorder>
      <Filter onClick={() => setActiveFilter('top')} ref={topRef}>
        Top
      </Filter>
      <Filter onClick={() => setActiveFilter('latest')} ref={latestRef}>
        Latest
      </Filter>
      <Filter onClick={() => setActiveFilter('people')} ref={peopleRef}>
        People
      </Filter>
      <Filter onClick={() => setActiveFilter('media')} ref={mediaRef}>
        Media
      </Filter>
    </StyledTweetsFilter>
  );
}

export default SearchFilter;
