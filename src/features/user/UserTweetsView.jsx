/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import useGetUserTweets from '../../hooks/useGetUserTweets';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import TweetView from '../tweetView/TweetView';
import TweetViewSkeletal from '../../ui/SkeletalUI/tweet/TweetViewSkeletal';

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.524rem;
`;

const Sentinal = styled.div`
  height: 0;
  background-color: transparent;
`;

function UserTweetsView({ id, filter, isBookmark }) {
  const [observer, setObserver] = useState(null);
  const sentinalRef = useRef();

  const {
    userTweets,
    isLoading: isLoadingTweets,
    error: tweetsError,
    fetchNextPage,
    isFetching,
  } = useGetUserTweets({ userId: id, filter: filter, isBookmark: isBookmark });

  useEffect(() => {
    // Function to initialize the observer
    const initializeObserver = () => {
      const newObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (isFetching) return;
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      });

      if (sentinalRef.current) {
        newObserver.observe(sentinalRef.current);
      }

      // Clean up the previous observer before setting the new one
      if (observer) {
        observer.disconnect();
      }

      setObserver(newObserver); // Update the observer state with the new instance
    };

    // Call the function to initialize or update the observer
    initializeObserver();

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [filter, isFetching]); // Depend on filter and isFetching to reinitialize the observer when needed, but not the observer, because it will cause re-rendering loop

  if (isLoadingTweets) return <TweetViewSkeletal />;
  if (tweetsError) toast.error(tweetsError.message);

  return (
    <TweetsContainer>
      {userTweets?.pages.map(page =>
        page === null
          ? ''
          : page.map(tweet => (
              <TweetView key={`tweet-${id}-${tweet.id}`} tweet={tweet} />
            ))
      )}
      <Sentinal ref={sentinalRef}></Sentinal>
      {isFetching && <TweetViewSkeletal />}
    </TweetsContainer>
  );
}

export default UserTweetsView;
