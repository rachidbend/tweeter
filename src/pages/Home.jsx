import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PublishTweet from '../features/tweeting/PublishTweet';
import HashtagTrends from '../ui/HashtagTrends';
import { useGetTimeline } from '../hooks/useGetTimeline';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';
import TweetView from '../features/tweetView/TweetView';
import WhoToFollow from '../ui/WhoToFollow';

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

function Home() {
  const { timeline, isLoading, error } = useGetTimeline();

  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);

  let sortedArray = timeline[0]
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <StyledHome>
      <MainContent>
        <PublishTweet />
        <Link to={'/user/b9628375-9682-4879-a408-45e7e2b8b9db'}>
          Daniel Jensen
        </Link>
        <br />
        <Link to={'/user/132c3b53-0015-4992-8dea-990990d6a93b'}>
          Xanthe Neal
        </Link>
        <br />
        <Link to={`/user/37544e6e-ea45-44ff-bacf-7804bad48e1d`}>
          Rachid Bendaghor
        </Link>
        <TweetsContainer>
          {sortedArray.map(tweet => (
            <TweetView tweet={tweet} key={`timeline${tweet.id}`} />
          ))}
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
