import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    background-position: -46.8rem 0;
  }

  100% {
    background-position: 46.8rem 0;
  }
`;

const StyledTweetViewHeaderSkeletal = styled.div`
  display: flex;
  gap: 1.7rem;
  /* background: var(--color-grey-600); */
`;

export const ShimmerEffect = styled.div`
  background: linear-gradient(
    to right,
    var(--color-shimmer-100) 8%,
    var(--color-shimmer-200) 18%,
    var(--color-shimmer-100) 33%
  );

  background-size: 100rem 10.4rem;
  overflow: hidden;
  animation: ${loading} 1.8s infinite linear;
`;

const Avatar = styled(ShimmerEffect)`
  height: 4rem;
  width: 4rem;
  border-radius: 0.8rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const Username = styled(ShimmerEffect)`
  width: 14rem;
  height: 2.2rem;

  border-radius: 0.8rem;
  margin-bottom: 0.4rem;
`;
const PublishTime = styled(ShimmerEffect)`
  width: 10rem;
  height: 1.8rem;
  border-radius: 0.8rem;
`;
function TweetViewHeaderSkeletal() {
  return (
    <StyledTweetViewHeaderSkeletal>
      <Avatar />
      <Container>
        <Username />
        <PublishTime />
      </Container>
    </StyledTweetViewHeaderSkeletal>
  );
}

export default TweetViewHeaderSkeletal;
