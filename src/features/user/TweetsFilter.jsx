/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { setPositionSpan } from '../../helpers/functions';
import { useGetLikes } from '../../hooks/useGetLikes';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import { useGetUserData } from '../../hooks/user/useGetUserData';
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

const Filter = styled.li`
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

function TweetsFilter({ handleFilterTweets, isBookmark = false }) {
  // there are 4 filters,
  // - all tweets, including retweets (but not replies)
  // - replies
  // - media (tweets that include images)
  // - likes (the tweets that the user has liked)

  // this is what ditermines which filter is active, because only one can be active at a time, the default filter is 'tweets'
  // names of the filters, 'tweets', 'replies', 'media', and 'likes'
  const [activeFilter, setActiveFilter] = useState('tweets');

  // refs to keep track of the positioning of each element, so that the side span would be in the right place
  const spanRef = useRef();
  const tweetsRef = useRef();
  const repliesRef = useRef();
  const mediaRef = useRef();
  const likesRef = useRef();

  useEffect(
    function () {
      // make sure that all the elements have mounted first
      if (
        !tweetsRef.current ||
        !repliesRef.current ||
        !mediaRef.current ||
        !likesRef.current
      ) {
        return;
      }

      // when ever the filter changes, chnage the position of the span to be next to the current active filter
      if (activeFilter === 'tweets') {
        setPositionSpan(spanRef, tweetsRef, 'vertical');
      } else if (activeFilter === 'replies') {
        setPositionSpan(spanRef, repliesRef, 'vertical');
      } else if (activeFilter === 'media') {
        setPositionSpan(spanRef, mediaRef, 'vertical');
      } else if (activeFilter === 'likes') {
        setPositionSpan(spanRef, likesRef, 'vertical');
      } else {
        setPositionSpan(spanRef, tweetsRef, 'vertical');
      }

      // set the outer filter to the current active filter, which is changed by the user
      handleFilterTweets(activeFilter);
    },
    [activeFilter, handleFilterTweets, isBookmark]
  );

  return (
    <StyledTweetsFilter
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
    >
      <SideBorder ref={spanRef}></SideBorder>
      <Filter onClick={() => setActiveFilter('tweets')} ref={tweetsRef}>
        Tweets
      </Filter>
      <Filter onClick={() => setActiveFilter('replies')} ref={repliesRef}>
        Replies
      </Filter>
      <Filter onClick={() => setActiveFilter('media')} ref={mediaRef}>
        Media
      </Filter>
      <Filter onClick={() => setActiveFilter('likes')} ref={likesRef}>
        Likes
      </Filter>
    </StyledTweetsFilter>
  );
}

export default TweetsFilter;
