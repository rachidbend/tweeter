import styled from 'styled-components';

const StyledHome = styled.div`
  background-color: var(--color-grey-600);
  min-height: 100vh;
  z-index: -1;
`;

function Home() {
  return <StyledHome>Home</StyledHome>;
}

export default Home;
