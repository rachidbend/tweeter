/* eslint-disable react/prop-types */
import styled from 'styled-components';
import TweetRetweetButton from './TweetRetweetButton';
import TweetLikeButton from './TweetLikeButton';
import TweetSaveButton from './TweetSaveButton';
import { Button, ButtonText, CommentIcon } from './TweetView';
import { tweetState } from '../../helpers/functions';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import { useUser } from '../../hooks/authHooks/useUser';

const StyledTweetButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.704rem;
  padding-bottom: 0.4rem;
  border-bottom: 0.1rem solid var(--color-grey-600);
  margin-bottom: 0.9rem;
`;

function TweetButtons({ tweet }) {
  const { user: currentUser } = useUser();
  const { userProfile } = useGetUserData(currentUser.id);

  // get the states of the tweet, to know if the current tweet is bookmarked, liked, or retweeted by the current user
  const { isSaved, isLiked, isRetweeted } = tweetState(tweet, userProfile);

  return (
    <StyledTweetButtons>
      {/**************************************
      for now, the comment button does nothing 
      ***************************************/}
      <Button>
        <CommentIcon />
        <ButtonText>Comment</ButtonText>
      </Button>

      {/* tweet RETWEET button */}
      <TweetRetweetButton isRetweeted={isRetweeted} tweet={tweet} />

      {/* tweet LIKE button */}
      <TweetLikeButton isLiked={isLiked} tweet={tweet} />

      {/* tweet SAVE button */}
      <TweetSaveButton isSaved={isSaved} tweet={tweet} />
    </StyledTweetButtons>
  );
}

export default TweetButtons;
