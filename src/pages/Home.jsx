import styled from 'styled-components';
import Tweet from '../features/tweeting/Tweet';

const StyledHome = styled.div`
  min-height: 100vh;
  min-height: 100svh;

  display: grid;
  grid-template-columns: 74.5rem 30.6rem;
  gap: 2.5rem;

  justify-content: center;
  margin-top: 2.5rem;
`;

const MainContent = styled.div``;
const SideContent = styled.div``;

function Home() {
  return (
    <StyledHome>
      <MainContent>
        <Tweet />
      </MainContent>
      <SideContent></SideContent>
    </StyledHome>
  );
}

export default Home;
