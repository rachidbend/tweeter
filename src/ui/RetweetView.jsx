/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useGetTweet } from '../hooks/tweet/useGetTweet';
import Spinner from './Spinner';
import { useGetUserData } from '../hooks/user/useGetUserData';
import { formatDate } from '../helpers/functions';

const StyledRetweetView = styled.div``;
const Username = styled.p`
  font-family: var(--font-poppings);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-grey-200);
`;

const PublishTime = styled.p`
  font-family: var(--font-noto);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-grey-400);
  letter-spacing: -0.035em;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  margin-bottom: 1.4rem;
`;
const Content = styled.div`
  margin-bottom: 1.3rem;
`;
const TextContent = styled.p`
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: -0.035em;
  margin-bottom: 2rem;
  color: var(--color-grey-200);
`;
const ImageContent = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.8rem;
  margin-bottom: 1.2rem;
`;

const RetweetContainer = styled.div`
  margin-left: 4rem;
  border-left: 2px solid var(--color-grey-300);
  padding-left: 2.4rem;
`;

function RetweetView({ tweetId, publisherId }) {
  const { tweet, isLoading, error } = useGetTweet({
    tweetId: tweetId,
    publisherId: publisherId,
  });
  const { userProfile, isLoading: isLoadingUser } = useGetUserData(publisherId);
  if (isLoading || isLoadingUser) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  const publishingText = formatDate(tweet.created_at);

  return (
    <RetweetContainer>
      <StyledRetweetView>
        <Header>
          <Username>{userProfile.user_name}</Username>
          <PublishTime>{publishingText}</PublishTime>
        </Header>
        <Content>
          <TextContent>{tweet.content}</TextContent>
          {tweet.image.length > 0 && <ImageContent src={tweet.image} />}
        </Content>
      </StyledRetweetView>
    </RetweetContainer>
  );
}

export default RetweetView;
