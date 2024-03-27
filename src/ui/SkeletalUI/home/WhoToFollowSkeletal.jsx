import styled from 'styled-components';
import { ShimmerEffect } from '../tweet/TweetViewHeaderSkeletal';
import UserViewSkeletal from './UserViewSkeletal';

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

function WhoToFollowSkeletal() {
  return (
    <StyledWhoToFollowSkeletal>
      <Title>
        <TitleText></TitleText>
      </Title>
      <Container>
        <UserViewSkeletal />
        <UserViewSkeletal />
      </Container>
    </StyledWhoToFollowSkeletal>
  );
}

export default WhoToFollowSkeletal;
