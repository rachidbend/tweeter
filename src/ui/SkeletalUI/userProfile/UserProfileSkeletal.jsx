import styled from 'styled-components';
import UserHeaderSkeletal from './UserHeaderSkeletal';
import { ShimmerEffect } from '../tweet/TweetViewHeaderSkeletal';
import TweetFilterSkeletal from '../tweet/TweetFilterSkeletal';
import TweetViewSkeletal from '../tweet/TweetViewSkeletal';

const StyledUserProfileSkeletal = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
`;

const BackgroundImage = styled(ShimmerEffect)`
  width: 100%;
  height: 29.751rem;

  background-color: var(--color-grey-500);
`;

const PageContainer = styled.div`
  padding: 0 5.4rem;
  max-width: calc(107.3rem + (5.4rem * 2));
  margin: 0 auto;

  @media screen and (max-width: 450px) {
    max-width: 100%;
    padding: 0 1.66rem;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 30.4rem 1fr;
  gap: 2.4rem;
  align-items: start;

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

function UserProfileSkeletal() {
  return (
    <StyledUserProfileSkeletal>
      <BackgroundImage />
      <PageContainer>
        <UserHeaderSkeletal />
        <ContentContainer>
          <TweetFilterSkeletal />
          <TweetViewSkeletal />
        </ContentContainer>
      </PageContainer>
    </StyledUserProfileSkeletal>
  );
}

export default UserProfileSkeletal;
