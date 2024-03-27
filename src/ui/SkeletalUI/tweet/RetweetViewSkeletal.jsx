import styled from 'styled-components';
import { ShimmerEffect } from './TweetViewHeaderSkeletal';

const StyledRetweetViewSkeletal = styled.div`
  margin-left: 4rem;
  border-left: 2px solid var(--color-grey-300);
  padding-left: 2.4rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.4rem;
`;
const Username = styled(ShimmerEffect)`
  height: 1.6rem;
  width: 12rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;
const CreationDate = styled(ShimmerEffect)`
  height: 1.4rem;
  width: 10rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;
const ContentContainer = styled.div`
  margin-bottom: 2rem;
`;
const ContentText = styled(ShimmerEffect)`
  height: 1.6rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
  margin-bottom: 0.8rem;

  &:nth-child(3) {
    width: 70%;
    margin-bottom: 0rem;
  }
`;

const Image = styled(ShimmerEffect)`
  height: 26rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
  margin-bottom: 1.2rem;
`;
function RetweetViewSkeletal() {
  return (
    <StyledRetweetViewSkeletal>
      <Container>
        <Username />
        <CreationDate />
      </Container>
      <ContentContainer>
        <ContentText />
        <ContentText />
        <ContentText />
      </ContentContainer>
      <Image />
    </StyledRetweetViewSkeletal>
  );
}

export default RetweetViewSkeletal;
