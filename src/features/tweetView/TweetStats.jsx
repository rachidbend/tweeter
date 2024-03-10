/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { formatNumber } from '../../helpers/functions';

const StyledTweetStats = styled.div`
  display: flex;
  justify-content: end;
  gap: 1.6rem;
  padding-bottom: 0.8rem;
  border-bottom: 0.1rem solid var(--color-grey-600);
  margin-bottom: 0.4rem;
`;
const Stat = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-400);
  letter-spacing: -0.035em;
`;

// Component that displays the stats of a tweet
// including: likes, replies, retweets, and saves (bookmarks)
function TweetStats({ tweet }) {
  return (
    <StyledTweetStats>
      <Stat>{formatNumber(tweet?.likes.length)} Likes</Stat>
      <Stat>{formatNumber(tweet?.replies.length)} Comment</Stat>
      <Stat>{formatNumber(tweet?.retweets.length)} Retweets</Stat>
      <Stat>{formatNumber(tweet?.saves.length)} Saved</Stat>
    </StyledTweetStats>
  );
}

export default TweetStats;
