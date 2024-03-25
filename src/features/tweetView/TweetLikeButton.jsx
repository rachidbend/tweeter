/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Button, ButtonText } from './TweetView';
import { IconHeart, IconHeartOutline } from '../../styles/Icons';
import { useLikeTweet } from '../../hooks/tweet/like/useLikeTweet';
import { useNotifyUserOfLike } from '../../hooks/tweet/like/useNotifyUserOfLike';
import { useRemoveTweetFromLikes } from '../../hooks/tweet/like/useRemoveTweetFromLikes';
import { useNotifyUserOfUnlike } from '../../hooks/tweet/like/useNotifyUserOfUnlike';

const LikeIconFull = styled(IconHeart)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;

const LikeIconOutline = styled(IconHeartOutline)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;

function TweetLikeButton({ isLiked, tweet }) {
  // Like handlers
  const { likeTweet } = useLikeTweet();
  const { notifyUserOfLike } = useNotifyUserOfLike();
  const { removeTweetFromLikes } = useRemoveTweetFromLikes();
  const { notifyUserOfUnlike } = useNotifyUserOfUnlike();

  function handleLike() {
    likeTweet({ newLike: tweet });
    notifyUserOfLike({ targetId: tweet.publisher_id, tweetId: tweet.id });
  }

  function handleUnlike() {
    removeTweetFromLikes({ tweet: tweet });
    notifyUserOfUnlike({ targetId: tweet.publisher_id, tweetId: tweet.id });
  }

  return (
    <Button onClick={isLiked ? handleUnlike : handleLike} $isLiked={isLiked}>
      {isLiked ? <LikeIconFull /> : <LikeIconOutline />}

      <ButtonText>{isLiked ? 'Liked' : 'Like'}</ButtonText>
    </Button>
  );
}

export default TweetLikeButton;
