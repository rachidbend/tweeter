import styled from 'styled-components';
import { ShimmerEffect } from '../tweet/TweetViewHeaderSkeletal';
import UserViewSkeletal from '../home/UserViewSkeletal';

const StyledUserModalSkeletal = styled.div`
  min-width: 25rem;
  width: 100%;
  max-width: 63.6rem;
  margin-inline: 1.3rem;
  background-color: var(--color-white);
  border-radius: 0.8rem;
  padding: 1.2rem 2.5rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.8rem;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid var(--color-grey-500);
`;

const Title = styled(ShimmerEffect)`
  height: 1.6rem;
  width: 14.8rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const CloseButton = styled(ShimmerEffect)`
  height: 2rem;
  width: 2rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

function UserModalSkeletal() {
  return (
    <StyledUserModalSkeletal>
      <Header>
        <Title></Title>
        <CloseButton />
      </Header>
      <UserViewSkeletal variant="userPage" />
      <UserViewSkeletal variant="userPage" />
      <UserViewSkeletal variant="userPage" />
      <UserViewSkeletal variant="userPage" />
    </StyledUserModalSkeletal>
  );
}

export default UserModalSkeletal;
