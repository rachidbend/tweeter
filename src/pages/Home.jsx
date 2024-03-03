import styled from 'styled-components';
import Tweet from '../features/tweeting/Tweet';
import { Link } from 'react-router-dom';

const StyledHome = styled.div`
  min-height: 100vh;
  min-height: 100svh;

  display: grid;
  grid-template-columns: 74.5rem 30.6rem;
  gap: 2.5rem;

  justify-content: center;
  margin-top: 2.5rem;

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
        <Tweet />
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
