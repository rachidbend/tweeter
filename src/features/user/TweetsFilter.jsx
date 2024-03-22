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

function TweetsFilter({
  tweets,
  handleFilterTweets,
  userId,
  isBookmark = false,
}) {
  // there are 4 filters,
  // - all tweets, including retweets (but not replies)
  // - replies
  // - media (tweets that include images)
  // - likes (the tweets that the user has liked)

  // this is what ditermines which filter is active, because only one can be active at a time, the default filter is 'tweets'
  // names of the filters, 'tweets', 'replies', 'media', and 'likes'
  const [activeFilter, setActiveFilter] = useState('tweets');
  const { likedTweets, isLoading, error } = useGetLikes(userId);
  const { userProfile, isLoading: isLoadingUser } = useGetUserData(userId);

  const spanRef = useRef();
  const tweetsRef = useRef();
  const repliesRef = useRef();
  const mediaRef = useRef();
  const likesRef = useRef();

  useEffect(
    function () {
      if (
        !tweetsRef.current ||
        !repliesRef.current ||
        !mediaRef.current ||
        !likesRef.current
      ) {
        return;
      }

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

      // if the filter is set to tweets
      if (activeFilter === 'tweets') {
        // show only the tweets that are not replies
        const filteredTweets = tweets?.filter(tweet => !tweet.isReply);
        handleFilterTweets(filteredTweets);
      }
      // if the filter is set to replies
      else if (activeFilter === 'replies') {
        // showo only the tweets that are replies
        const filteredTweets = tweets?.filter(tweet => {
          return tweet.isReply && !tweet.isRetweet;
        });
        handleFilterTweets(filteredTweets);
      }
      // if the filter is set to media
      else if (activeFilter === 'media') {
        // show only the tweets that include an image
        const filteredTweets = tweets?.filter(
          tweet => !tweet.isReply && !tweet.isRetweet && tweet.image !== ''
        );
        handleFilterTweets(filteredTweets);
      } // if the filter is set to likes
      else if (activeFilter === 'likes') {
        if (isBookmark) {
          const filteredTweets = tweets.filter(tweet => {
            return userProfile.likes.some(like => like.id === tweet.id);
          });
          handleFilterTweets(filteredTweets);
        } else {
          // show only the tweets that this user has liked
          handleFilterTweets(likedTweets[0]);
        }
      }
    },
    [
      activeFilter,
      tweets,
      handleFilterTweets,
      likedTweets,
      isBookmark,
      userProfile?.likes,
    ]
  );

  useEffect(
    function () {
      setActiveFilter('tweets');
    },
    [tweets]
  );

  if (isLoading || isLoadingUser) return <Spinner />;
  if (error) toast.error(error.message);
  // if (!tweets) return;
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
        Tweets & replies
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
