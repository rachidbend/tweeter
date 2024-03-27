import styled from 'styled-components';
import TweetViewHeaderSkeletal, {
  ShimmerEffect,
} from './TweetViewHeaderSkeletal';

const StyledTweetViewSkeletal = styled.div`
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: var(--shadow-100);
`;

const TextContent = styled.div`
  margin-top: 2.2rem;
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
const ImageContent = styled(ShimmerEffect)`
  height: 26rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
  margin-bottom: 1.2rem;
`;

const StatContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: end;
  align-items: center;
  margin-bottom: 0.8rem;
`;
const Stat = styled(ShimmerEffect)`
  height: 1.4rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);

  &:nth-child(1) {
    width: 8.8rem;
  }
  &:nth-child(2) {
    width: 8.8rem;
  }
  &:nth-child(3) {
    width: 7.2rem;
  }
  &:nth-child(4) {
    width: 5.5rem;
  }
`;

const ButtonContainer = styled.div`
  border-top: 0.1rem solid var(--color-grey-600);
  border-bottom: 0.1rem solid var(--color-grey-600);
  /* height: 5rem; */
  margin-bottom: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
`;

const ButtonText = styled(ShimmerEffect)`
  height: 2rem;
  width: 8rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const ReplyContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;
const Avatar = styled(ShimmerEffect)`
  height: 4rem;
  width: 4rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;
const Input = styled(ShimmerEffect)`
  height: 4rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
  /* width: 100%; */
  flex-grow: 1;
`;

function TweetViewSkeletal() {
  return (
    <StyledTweetViewSkeletal>
      <TweetViewHeaderSkeletal />
      <TextContent>
        <TextContentText></TextContentText>
        <TextContentText></TextContentText>
        <TextContentText></TextContentText>
      </TextContent>
      <ImageContent></ImageContent>
      <StatContainer>
        <Stat></Stat>
        <Stat></Stat>
        <Stat></Stat>
        <Stat></Stat>
      </StatContainer>
      <ButtonContainer>
        <Button>
          <ButtonText></ButtonText>
        </Button>
        <Button>
          <ButtonText></ButtonText>
        </Button>
        <Button>
          <ButtonText></ButtonText>
        </Button>
        <Button>
          <ButtonText></ButtonText>
        </Button>
      </ButtonContainer>
      <ReplyContainer>
        <Avatar></Avatar>
        <Input></Input>
      </ReplyContainer>
    </StyledTweetViewSkeletal>
  );
}

export default TweetViewSkeletal;
