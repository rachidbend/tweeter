import styled from 'styled-components';
import { ShimmerEffect } from '../tweet/TweetViewHeaderSkeletal';

const StyledPublishTweetSkeletal = styled.div`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  box-shadow: var(--shadow-100);

  padding: 1.1rem 2rem;

  /* margin-bottom: 5rem; */
  margin-bottom: 2.4rem;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

const Heading = styled.div`
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
  border-bottom: 0.1rem solid var(--color-grey-500);
`;

const HeadingText = styled(ShimmerEffect)`
  height: 1.8rem;
  width: 10rem;
  background-color: var(--color-grey-600);
  border-radius: 0.4rem;
`;

const Container = styled.div`
  display: grid;
  column-gap: 1.2rem;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: auto auto;
`;

const Avatar = styled(ShimmerEffect)`
  height: 4rem;
  width: 4rem;
  border-radius: 0.8rem;
  background-color: var(--color-grey-600);
`;

const Input = styled(ShimmerEffect)`
  height: 2.2rem;
  width: 13.7rem;
  border-radius: 0.8rem;
  background-color: var(--color-grey-600);
  margin-top: 0.9rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3.8rem;
  grid-column: 2 / 3;

  @media screen and (max-width: 450px) {
    grid-column: 1 / 3;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icons = styled(ShimmerEffect)`
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);

  margin-right: 0.9rem;

  &:last-child {
    margin-right: 0;
  }
`;
const ButtonText = styled(ShimmerEffect)`
  height: 1.5rem;
  width: 10rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const Button = styled(ShimmerEffect)`
  height: 3.2rem;
  width: 8rem;
  border-radius: 0.8rem;
  background-color: var(--color-grey-600);
`;

function PublishTweetSkeletal() {
  return (
    <StyledPublishTweetSkeletal>
      <Heading>
        <HeadingText></HeadingText>
      </Heading>
      <Container>
        <Avatar></Avatar>
        <Input></Input>

        <ButtonsContainer>
          <Wrapper>
            <Icons></Icons>
            <Icons></Icons>
            <ButtonText></ButtonText>
          </Wrapper>
          <Button></Button>
        </ButtonsContainer>
      </Container>
    </StyledPublishTweetSkeletal>
  );
}

export default PublishTweetSkeletal;
