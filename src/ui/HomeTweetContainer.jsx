import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useGetTimeline } from '../hooks/useGetTimeline';
import toast from 'react-hot-toast';
import HomeSkeletal from './SkeletalUI/home/HomeSkeletal';
import TweetView from '../features/tweetView/TweetView';
import TweetViewSkeletal from './SkeletalUI/tweet/TweetViewSkeletal';

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2.4rem;
`;

const Sentinal = styled.div`
  background-color: transparent;
  height: 0px;
`;

export default function HomeTweetContainer() {
  const [observer, setObserver] = useState(null);
  // a sentinal ref is used to provide the intersection observer with the element to observe
  const sentinalRef = useRef();

  // custome hook to fetch the data of the page line, and to enable infinite scrolling
  const { timeline, isLoading, error, fetchNextPage, isFetching } =
    useGetTimeline();

  useEffect(
    function () {
      // initianising the observer
      const initailizeObserver = () => {
        // creating an intersection observer
        const newObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            // if a function is fetching data, do nothing
            if (isLoading || isFetching) return;
            // if there is no fetching happening, AND the Sentinal element is intersecting (visible), fetch the next appropriate page depending on the filter
            if (entry.isIntersecting) {
              fetchNextPage();
            }
          });
        });

        // make sure the sentinal element is mounted first, then observe it
        if (sentinalRef.current) {
          newObserver.observe(sentinalRef.current);
        }

        // if there already is an observer, disconnect it
        if (observer) {
          newObserver.disconnect;
        }

        // set the observer state to the new observer, to keep track of the observer and make sure there only is one, and is used even after a filter change
        setObserver(newObserver);
      };

      initailizeObserver();

      // if there is an observer, disconnect it when this component unmounts
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
      // the dependency array can not include the observer state, or it will cause infinite loop
    },
    [sentinalRef.current, isFetching]
  );

  if (isLoading) return <HomeSkeletal />;
  if (error) toast.error(error.message);

  return (
    <TweetsContainer>
      {timeline?.pages.map(page =>
        page === null
          ? ''
          : page.map(tweet => (
              <TweetView tweet={tweet} key={`timeline${tweet.id}`} />
            ))
      )}

      {isFetching && <TweetViewSkeletal />}
      <Sentinal ref={sentinalRef}></Sentinal>
    </TweetsContainer>
  );
}
