import styled from 'styled-components';
import TrendsSkeletal from './TrendsSkeletal';
import WhoToFollowSkeletal from './WhoToFollowSkeletal';
import PublishTweetSkeletal from './PublishTweetSkeletal';
import TweetViewSkeletal from '../tweet/TweetViewSkeletal';

const StyledHomeSkeletal = styled.div`
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

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2.2rem;

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

function HomeSkeletal() {
  return (
    <StyledHomeSkeletal>
      <MainContent>
        <PublishTweetSkeletal />

        <TweetViewSkeletal />
        <TweetViewSkeletal />
        <TweetViewSkeletal />
      </MainContent>
      <SideContent>
        <TrendsSkeletal />
        <WhoToFollowSkeletal />
      </SideContent>
    </StyledHomeSkeletal>
  );
}

export default HomeSkeletal;
