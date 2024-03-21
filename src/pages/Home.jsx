import styled from 'styled-components';
import PublishTweet from '../features/tweeting/PublishTweet';
import HashtagTrends from '../ui/HashtagTrends';
import { useGetTimeline } from '../hooks/useGetTimeline';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';
import TweetView from '../features/tweetView/TweetView';
import WhoToFollow from '../ui/WhoToFollow';
import { useEffect, useRef, useState } from 'react';

const StyledHome = styled.div`
  min-height: 100vh;
  min-height: 100svh;

  display: grid;
  grid-template-columns: 1fr 30.6rem;
  gap: 2.5rem;

  justify-content: center;

  margin-top: 2.5rem;

  width: min(var(--content-max-width), 100% - var(--page-padding-large) * 2);
  margin-inline: auto;

  @media screen and (max-width: 450px) {
    gap: 0;
    width: min(100% - var(--page-padding-small) * 2);
    margin-inline: auto;
    grid-template-columns: 1fr;
    margin-top: 1.469rem;
  }
`;

const MainContent = styled.div``;
const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2.2rem;

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2.4rem;
`;

const NextPageButton = styled.button`
  cursor: pointer;
  background-color: red;
  color: white;
  border: none;
  padding: 1rem;
`;

const Sentinal = styled.div`
  background-color: transparent;
  height: 0px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const sentinalRef = useRef();

  const [lastTweet, setLastTweet] = useState('');
  const { timeline, isLoading, error, fetchNextPage, isFetching } =
    useGetTimeline({
      limit: 3,
      lastTweetId: lastTweet,
    });

  function handleLastTweet() {
    const latTweetEl = timeline.pages[0].slice(-1);

    setLastTweet(latTweetEl[0].created_at);
    fetchNextPage();
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (isFetching) return;
      if (entry.isIntersecting) {
        console.log('Sentinal is visible');
        fetchNextPage();
      }
    });
  });

  useEffect(
    function () {
      if (sentinalRef.current) {
        observer.observe(sentinalRef?.current);
      }

      return () => observer.disconnect();
    },
    [sentinalRef.current]
  );

  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);
  return (
    <StyledHome>
      <MainContent>
        <PublishTweet />
        <TweetsContainer>
          {timeline?.pages.map(page =>
            page === null
              ? ''
              : page.map(tweet => (
                  <TweetView tweet={tweet} key={`timeline${tweet.id}`} />
                ))
          )}
          {/* <NextPageButton onClick={handleLastTweet}>next page</NextPageButton> */}
          {isFetching && (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          )}
          <Sentinal ref={sentinalRef}></Sentinal>
        </TweetsContainer>
      </MainContent>
      <SideContent>
        <HashtagTrends />
        <WhoToFollow />
      </SideContent>
    </StyledHome>
  );
}

export default Home;

/*


*/
