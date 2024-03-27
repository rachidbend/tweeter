import styled from 'styled-components';
import { ShimmerEffect } from './TweetViewHeaderSkeletal';

const StyledTweetReplySkeletal = styled.div``;

const Avatar = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

function TweetReplySkeletal() {
  return (
    <StyledTweetReplySkeletal>TweetReplySkeletal</StyledTweetReplySkeletal>
  );
}

export default TweetReplySkeletal;
