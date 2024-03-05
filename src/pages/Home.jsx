import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PublishTweet from '../features/tweeting/PublishTweet';

const StyledHome = styled.div`
  min-height: 100vh;
  min-height: 100svh;

  display: grid;
  grid-template-columns: 1fr 30.6rem;
  gap: 2.5rem;

  justify-content: center;
  margin: 0 auto;
  margin-top: 2.5rem;
  padding: 0 5.4rem;

  max-width: calc(107.3rem + (5.4rem * 2));
  @media screen and (max-width: 450px) {
    gap: 0;
    padding: 0 1.6rem;
    grid-template-columns: 1fr;
    margin-top: 1.469rem;
  }
`;

const MainContent = styled.div``;
const SideContent = styled.div`
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

function Home() {
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
      </MainContent>
      <SideContent></SideContent>
    </StyledHome>
  );
}

export default Home;
