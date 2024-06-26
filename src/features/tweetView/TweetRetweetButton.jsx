/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Button, ButtonText } from './TweetView';
import { useRetweet } from '../../hooks/tweet/retweet/useRetweet';
import { useAddRetweetId } from '../../hooks/tweet/retweet/useAddRetweetId';
import useNotifyUserOfRetweet from '../../hooks/tweet/retweet/useNotifyUserOfRetweet';
import { useRemoveTweet } from '../../hooks/tweet/useRemovetweet';
import useRemoveTweetId from '../../hooks/tweet/useRemoveTweetId';
import { useNotifyUserOfRetweetRemove } from '../../hooks/tweet/retweet/useNotifyUserOfRetweetRemove';
import { IconSync, IconSyncDisabled } from '../../styles/Icons';
import { useUser } from '../../hooks/authHooks/useUser';
import { v4 as uuidv4 } from 'uuid';

const RemoveRetweetIcon = styled(IconSyncDisabled)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;

const RetweetIcon = styled(IconSync)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;

function TweetRetweetButton({ isRetweeted, tweet }) {
  const { user: currentUser } = useUser();
  // Retweet handlers
  const { retweet } = useRetweet();
  const { addRetweetId } = useAddRetweetId();
  const { notifyUserOfRetweet } = useNotifyUserOfRetweet();
  function handleRetweet() {
    // add the retweet as a tweet

    const newRetweet =
      // the id is created here to enable the rest of the code
      {
        id: uuidv4(),
        hastag: '',
      };

    retweet(
      { newTweet: newRetweet, tweet: tweet },
      {
        onSuccess: () => {
          // these two have to be done after the retweet is successful to insure proper order, bacause if the retweet operation can interfeer with the notifying operation, thanks to using the index as a guide for the notifying SQL function

          // add the tweet id to the retweet ids
          addRetweetId({ tweetId: tweet.id });
          // notify the user that their tweet has been retweeted
          notifyUserOfRetweet({
            targetId: tweet.publisher_id,
            tweetId: tweet.id,
            retweetId: newRetweet.id,
          });
        },
      }
    );
  }

  const { removeTweet } = useRemoveTweet();
  const { removeRetweetId } = useRemoveTweetId();
  const { notifyUserOfUnretweet } = useNotifyUserOfRetweetRemove();

  function handleRemoveRetweet() {
    // remove the retweet
    const retweetObj = tweet.retweets.filter(retweet => {
      return retweet.retweeter_id === currentUser.id;
    });
    // console.log(tweet?.retweets);
    if (retweetObj.length === 0) return;
    removeTweet(
      { tweetId: retweetObj[0]?.retweet_id },
      {
        onSuccess: () => {
          // these two have to be done after the retweet is successful to insure proper order, bacause if the retweet operation can interfeer with the notifying operation, thanks to using the index as a guide for the notifying SQL function

          // remove the retweet id from the retweets array
          removeRetweetId({ retweetId: tweet.id });
          // Notify the original tweet of the retweet removal
          notifyUserOfUnretweet({
            targetId: tweet.publisher_id,
            tweetId: tweet.id,
          });
        },
      }
    );
  }

  return (
    <Button
      onClick={isRetweeted ? handleRemoveRetweet : handleRetweet}
      $isRetweeted={isRetweeted}
    >
      {isRetweeted ? <RemoveRetweetIcon /> : <RetweetIcon />}

      <ButtonText>{isRetweeted ? 'Retweeted' : 'Retweet'}</ButtonText>
    </Button>
  );
}

export default TweetRetweetButton;
