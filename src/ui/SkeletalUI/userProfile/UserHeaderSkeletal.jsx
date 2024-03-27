/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { ShimmerEffect } from '../tweet/TweetViewHeaderSkeletal';

const StyledUserHeader = styled.div`
  position: relative;
  top: -5.5rem;
  margin-bottom: -3rem;
  background-color: var(--color-white);
  border-radius: 1.2rem;
  padding: 1.963rem 2.761rem 3.523rem 2rem;
  display: flex;
  box-shadow: var(--shadow-100);
  gap: 2rem;

  @media screen and (max-width: 450px) {
    width: 100%;
    flex-direction: column;
    padding-bottom: 2.3rem;
    top: -2rem;
    gap: 1.1rem;
    margin-bottom: 0rem;
  }
`;
const UserAvatar = styled(ShimmerEffect)`
  width: 16rem;
  height: 16rem;
  border-radius: 0.8rem;
  border: 0.4rem solid var(--color-white);
  /* box-shadow: var(--shadow-100); */
  position: relative;
  top: -8.161rem; // 5.4 + 2.761
  margin-bottom: -8.161rem;
  object-fit: cover;
  object-position: center;
  background-color: var(--color-grey-600);

  flex-shrink: 0;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    width: 12.243rem;
    height: 12.243rem;
    margin: 0 auto;
    top: -9.6rem;
    margin-bottom: -8.161rem;
    border: 0.3rem solid var(--color-white);
  }
`;

const UserName = styled(ShimmerEffect)`
  height: 2.6rem;
  width: 16rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const ContentContainer = styled.div`
  max-width: 43rem;
  @media screen and (max-width: 450px) {
    width: 100%;
    text-align: center;
    margin-bottom: 1.3rem;
  }
`;
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

const InfoContainer = styled.div`
  /* width: 100%; */
`;

const UserAndStatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6rem;
  margin-bottom: 2.2rem;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;
    margin-bottom: 1.4rem;
  }
`;
const StatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;
const Stat = styled(ShimmerEffect)`
  height: 1.4rem;
  width: 10rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const EditButton = styled(ShimmerEffect)`
  margin-left: auto;
  align-self: flex-start;

  align-self: flex-start;

  border-radius: 0.4rem;

  margin-left: auto;
  height: 3.2rem;
  width: 10rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);

  @media screen and (max-width: 450px) {
    margin: 0 auto;
  }
`;

// This component displays the user's profile header
function UserHeaderSkeletal() {
  return (
    <StyledUserHeader>
      <UserAvatar />

      <InfoContainer>
        <UserAndStatContainer>
          <UserName></UserName>
          <StatContainer>
            <Stat></Stat>

            <Stat></Stat>
          </StatContainer>
        </UserAndStatContainer>

        <ContentContainer>
          <ContentText></ContentText>
          <ContentText></ContentText>
        </ContentContainer>
      </InfoContainer>

      <EditButton></EditButton>
    </StyledUserHeader>
  );
}

export default UserHeaderSkeletal;
