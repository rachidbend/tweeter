import styled from 'styled-components';
import { ShimmerEffect } from './TweetViewHeaderSkeletal';

const StyledCommetSkeletal = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 1rem;
`;

const Avatar = styled(ShimmerEffect)`
  height: 4rem;
  width: 4rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const Container = styled.div`
  flex-grow: 1;
`;

const CommentContainer = styled.div`
  background-color: var(--color-grey-700);
  border-radius: 0.8rem;
  padding: 0.9rem 1.5rem 2.2rem 1.5rem;
  margin-bottom: 0.4rem;
`;

const LikeContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: start;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-bottom: 0.8rem;
`;
const Username = styled(ShimmerEffect)`
  height: 1.6rem;
  width: 8rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;
const CreationDate = styled(ShimmerEffect)`
  height: 1.2rem;
  width: 10rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;
const ContentContainer = styled.div``;
const ContentText = styled(ShimmerEffect)`
  height: 1.6rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
  margin-bottom: 0.8rem;

  &:nth-child(2) {
    width: 70%;
    margin-bottom: 0rem;
  }
`;

const Like = styled(ShimmerEffect)`
  height: 1.7rem;
  width: 5rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

function CommetSkeletal() {
  return (
    <StyledCommetSkeletal>
      <Avatar />
      <Container>
        <CommentContainer>
          <Header>
            <Username /> <CreationDate />
          </Header>
          <ContentContainer>
            <ContentText></ContentText>
            <ContentText></ContentText>
          </ContentContainer>
        </CommentContainer>
        <LikeContainer>
          <Like />
          ·
          <Like />
        </LikeContainer>
      </Container>
    </StyledCommetSkeletal>
  );
}

export default CommetSkeletal;
