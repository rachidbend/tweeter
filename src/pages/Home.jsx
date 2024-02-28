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
      </MainContent>
      <SideContent></SideContent>
    </StyledHome>
  );
}

export default Home;
