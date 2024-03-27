import styled from 'styled-components';
import { ShimmerEffect } from '../tweet/TweetViewHeaderSkeletal';

const StyledWhoToFollowSkeletal = styled.div`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-100);
`;

const Title = styled.div`
  border-bottom: 0.1rem solid var(--color-grey-500);
  padding-bottom: 0.8rem;
  margin-bottom: 2.4rem;
`;
const TitleText = styled(ShimmerEffect)`
  height: 1.8rem;
  width: 7.8rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const Container = styled.div``;

const UserContainer = styled.div`
  border-bottom: 0.1rem solid var(--color-grey-500);
  margin-bottom: 2.4rem;
  padding-bottom: 2.2rem;
  &:last-child {
    border: none;
    margin-bottom: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1.7rem;
  margin-bottom: 1.9rem;
`;
const Avatar = styled(ShimmerEffect)`
  height: 4rem;
  width: 4rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const TextContainer = styled.div``;
const Username = styled(ShimmerEffect)`
  height: 2.2rem;
  width: 11rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
  margin-bottom: 0.68rem;
`;
const Followers = styled(ShimmerEffect)`
  height: 1.6rem;
  width: 7.8rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const Button = styled(ShimmerEffect)`
  height: 2.4rem;
  width: 7.9rem;
  border-radius: 0.8rem;
  background-color: var(--color-grey-600);
  margin-left: auto;
`;

const DescriptionContainer = styled.div`
  margin-bottom: 2.2rem;
`;
const DescriptionText = styled(ShimmerEffect)`
  height: 1.6rem;
  border-radius: 0.8rem;
  background-color: var(--color-grey-600);
  margin-bottom: 0.8rem;
  &:nth-child(2) {
    width: 80%;
    margin-bottom: 0rem;
  }
`;

const BackgroundImage = styled(ShimmerEffect)`
  height: 7.77rem;
  border-radius: 0.8rem;
  background-color: var(--color-grey-600);
`;

function WhoToFollowSkeletal() {
  return (
    <StyledWhoToFollowSkeletal>
      <Title>
        <TitleText></TitleText>
      </Title>
      <Container>
        <UserContainer>
          <Header>
            <Avatar></Avatar>
            <TextContainer>
              <Username></Username>
              <Followers></Followers>
            </TextContainer>
            <Button></Button>
          </Header>
          <DescriptionContainer>
            <DescriptionText></DescriptionText>
            <DescriptionText></DescriptionText>
          </DescriptionContainer>
          <BackgroundImage></BackgroundImage>
        </UserContainer>
        <UserContainer>
          <Header>
            <Avatar></Avatar>
            <TextContainer>
              <Username></Username>
              <Followers></Followers>
            </TextContainer>
            <Button></Button>
          </Header>
          <DescriptionContainer>
            <DescriptionText></DescriptionText>
            <DescriptionText></DescriptionText>
          </DescriptionContainer>
          <BackgroundImage></BackgroundImage>
        </UserContainer>
      </Container>
    </StyledWhoToFollowSkeletal>
  );
}

export default WhoToFollowSkeletal;
