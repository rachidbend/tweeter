import styled from 'styled-components';
import { ShimmerEffect } from './TweetViewHeaderSkeletal';

const StyledTweetReplySkeletal = styled.div`
  margin-left: 4rem;
  padding-left: 2rem;
  border-left: 2px solid var(--color-grey-300);
  margin-bottom: 1.2rem;
`;

const Container = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
`;
const ReplyingTo = styled(ShimmerEffect)`
  height: 1.7rem;
  width: 6.4rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const UserName = styled(ShimmerEffect)`
  margin-left: 0.6rem;
  height: 1.7rem;
  width: 7rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const TextContent = styled.div`
  margin-left: 0.6rem;
  margin-bottom: 2rem;
`;
const TextContentText = styled(ShimmerEffect)`
  height: 1.8rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
  margin-bottom: 0.8rem;

  &:nth-child(3) {
    width: 70%;
    margin-bottom: 0rem;
  }
`;

const Image = styled(ShimmerEffect)`
  width: 100%;
  height: 18rem;
  border-radius: 0.8rem;
  margin-bottom: 1.2rem;
  background-color: var(--color-grey-600);
`;
function TweetReplySkeletal() {
  return (
    <StyledTweetReplySkeletal>
      <Container>
        <ReplyingTo />
        <UserName />
      </Container>
      <TextContent>
        <TextContentText></TextContentText>
        <TextContentText></TextContentText>
        <TextContentText></TextContentText>
      </TextContent>
      <Image />
    </StyledTweetReplySkeletal>
  );
}

export default TweetReplySkeletal;
