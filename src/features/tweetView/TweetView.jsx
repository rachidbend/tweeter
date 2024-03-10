/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { IconCommentOutline } from '../../styles/Icons';
import RetweetView from '../../ui/RetweetView';
import Comment from './Comment';
import TweetStats from './TweetStats';
import TweetButtons from './TweetButtons';
import TweetHeader from './TweetHeader';
import TweetReply from './TweetReply';
import TweetReplyInput from './TweetReplyInput';

const StyledTweet = styled.div`
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: var(--shadow-100);
`;

// Main content
const Content = styled.div``;
const TextContent = styled.p`
  font-family: var(--font-noto);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
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
// the stats of the tweet (number of comment, retweets, and saves)

// commonly used components
export const Button = styled.button`
  font-family: var(--font-noto);
  width: 100%;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  padding: 1.1rem 0;
  color: ${props =>
    props.$isSaved === true
      ? 'var(--color-blue-100)'
      : props.$isLiked === true
      ? 'var(--color-red-100)'
      : props.$isRetweeted === true
      ? 'var(--color-green-100)'
      : 'var(--color-grey-200)'};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.86rem;
  border: none;
  border-radius: 0.8rem;
  background-color: transparent;
  cursor: pointer;

  transition: background var(--transition-300), color var(--transition-100);
  &:hover {
    background-color: var(--color-grey-600);
  }
`;

export const ButtonText = styled.span`
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

export const CommentIcon = styled(IconCommentOutline)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;

const RepliesContainer = styled.div`
  margin-top: 1rem;
  border-top: 0.1rem solid var(--color-grey-600);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function TweetView({ user, tweet }) {
  return (
    <StyledTweet>
      {/* Header of the tweet */}
      <TweetHeader tweet={tweet} user={user} />

      {/* container of the main content of the tweet */}
      <Content>
        {/* when a tweet is a reply */}
        {tweet.isReply && (
          <TweetReply originalTweeterId={tweet?.original_tweeter_id} />
        )}

        {/* Main content of the tweet */}
        <TextContent>{tweet.content}</TextContent>
        {tweet.image.length > 0 && <ImageContent src={tweet.image} />}
      </Content>

      {/* if this is a retweet, show the original tweet */}
      {tweet.isRetweet && (
        <RetweetView
          tweetId={tweet?.original_tweet_id}
          publisherId={tweet?.original_tweeter_id}
        />
      )}

      {/* showing the stats of the tweet */}
      <TweetStats tweet={tweet} />

      {/* ineraction buttons (retweet, like, save) */}
      <TweetButtons tweet={tweet} />

      {/* Reply input */}
      <TweetReplyInput tweet={tweet} />

      {/* if there are any replies, show them */}
      {tweet.replies.length > 0 && (
        <RepliesContainer>
          {tweet.replies.map((reply, index) => (
            <Comment reply={reply} key={`${index}-${tweet.id}-reply`} />
          ))}
        </RepliesContainer>
      )}
    </StyledTweet>
  );
}

export default TweetView;

// refactoring this component
// 1) the tweet should be in three parts, this component will choose which one to display depending on two paramiter, isReplie, isRetweet

// - one that shows normal tweets (is not a retweet or a reply)
// - one that shows retweets (is a retweet)
// - one that shows replies (is a replie)

// tweet structure
/*
  1) tweet header
    - user avater
    - user name
    - publishing date
    - additional options (delete tweet)

  2) tweet content
    - if is reply, show original tweet above
    - tweet content
    - if retweet, show origial tweet contetn bellow 

  3) tweet stats
    - stats

  4) tweet interactive buttons
    - buttons

  5) tweet reply input
    - reply input

  6) tweet replies section
    - all replies 
    - like button for a reply
*/
