/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import { Link } from 'react-router-dom';
import { useGetTweet } from '../../hooks/tweet/useGetTweet';
import Spinner from '../../ui/Spinner';

const StyledTweetReply = styled.div`
  margin-left: 4rem;
  padding-left: 2rem;
  border-left: 2px solid var(--color-grey-300);
  margin-bottom: 1.2rem;
`;

const ReplyingTo = styled.p`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-grey-300);

  margin-bottom: 1.2rem;
`;
const UserName = styled(Link)`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: var(--color-grey-100);
  margin-left: 0.6rem;
`;

const Content = styled.p`
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: -0.035em;
  margin-bottom: 2rem;
  color: var(--color-grey-200);
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.8rem;
  margin-bottom: 1.2rem;
`;

function TweetReply({ originalTweeterId, originalTweetId }) {
  const { userProfile: originalTweeter } = useGetUserData(originalTweeterId);
  const { tweet, isLoading } = useGetTweet({
    tweetId: originalTweetId,
    publisherId: originalTweeterId,
  });

  if (isLoading) return <Spinner />;
  if (!tweet) return;
  return (
    <StyledTweetReply>
      <ReplyingTo>
        replying to:
        <UserName to={`/user/${originalTweeter?.id}`}>
          {originalTweeter?.user_name}
        </UserName>
      </ReplyingTo>

      <Content>{tweet.content}</Content>
      <Image src={tweet.image} />
    </StyledTweetReply>
  );
}

export default TweetReply;
