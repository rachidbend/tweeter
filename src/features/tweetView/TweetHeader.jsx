/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../../helpers/functions';
import AvatarPlaceHolder from '../../ui/AvatarPlaceHolder';
import { useState } from 'react';
import { IconDotsHorizontal, IconTrashOutline } from '../../styles/Icons';
import { useUser } from '../../hooks/authHooks/useUser';
import { useRemoveTweet } from '../../hooks/tweet/useRemovetweet';
import useRemoveTweetId from '../../hooks/tweet/useRemoveTweetId';
import { useNotifyUserOfRetweetRemove } from '../../hooks/tweet/useNotifyUserOfRetweetRemove';
import { useRemoveReply } from '../../hooks/tweet/reply/useRemoveReply';
import useNotifyTweetOfReplyRemoval from '../../hooks/tweet/reply/useNotifyTweetOfReplyRemoval';

const StyledTweetHeader = styled.div`
  display: grid;
  grid-template-columns: 4rem auto;
  grid-template-rows: auto auto;
  column-gap: 1.75rem;
  margin-bottom: 2.1rem;
`;

const Avatar = styled.img`
  height: 4rem;
  width: 4rem;
  object-fit: cover;
  object-position: center;
  border-radius: 0.8rem;
`;
const AvatarContainer = styled.div`
  grid-row: 1/3;
`;
const UserName = styled(Link)`
  font-family: var(--font-poppings);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-black);
  text-decoration: none;
  cursor: pointer;
  width: fit-content;
  transition: color var(--transition-200), border var(--transition-200);
  border-bottom: 0.1rem solid transparent;
  &:hover {
    border-bottom: 0.1rem solid var(--color-grey-300);
    color: var(--color-grey-300);
  }
`;
const PublishTime = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-400);
  letter-spacing: -0.035em;
`;

const OptionsContainer = styled.div`
  margin-left: auto;
  position: relative;
`;
const OptionsButton = styled.button`
  cursor: pointer;
  width: 2.4rem;
  height: 2.4rem;
  background: none;
  border: none;
  color: var(--color-grey-300);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OptionsIcon = styled(IconDotsHorizontal)``;
const Options = styled.div`
  position: absolute;
  right: 0;
  background-color: var(--color-white);
  padding: 1.2rem 2.4rem 1.2rem 1.2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid var(--color-grey-600);
  box-shadow: var(--shadow-100);
`;

const DeleteButton = styled.button`
  color: var(--color-red-100);
  font-family: var(--font-noto);
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  background: none;
  border: none;
`;
const DeleteIcon = styled(IconTrashOutline)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
`;

const UsernameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function TweetHeader({ user, tweet }) {
  // state for managing the visibility of the options list
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  // getting the current users info
  const { user: currentUser } = useUser();

  // states that are reqired to function properly
  const isCurrentUser = tweet.publisher_id === currentUser.id;
  const isRetweet = tweet.isRetweet;
  const isReply = tweet.isReply;

  // custom hooks for deleting a tweet
  const { removeTweet } = useRemoveTweet();
  const { removeRetweetId } = useRemoveTweetId();
  const { notifyUserOfUnretweet } = useNotifyUserOfRetweetRemove();
  // removing the reply handlers
  const { removeReply } = useRemoveReply();
  const { notifyOriginalTweetOfReplyRemoval } = useNotifyTweetOfReplyRemoval();

  function handleDelete() {
    // NORMAL tweet
    if (!isReply && !isRetweet) {
      // if the tweet is a normal tweet, we delete it
      removeTweet({ tweetId: tweet.id });
      console.log('delete normal tweet');
    }

    // REPLY tweet
    if (isReply && !isRetweet) {
      // if the tweet is a reply, we delete the reply, and we notify the original tweet of the reply deletion

      if (!isCurrentUser) return;
      removeTweet(
        { tweetId: tweet.id },
        {
          onSuccess: () => {
            notifyOriginalTweetOfReplyRemoval({
              originalTweetID: tweet.original_tweet_id,
              originalTweeterId: tweet.original_tweeter_id,
              replyID: tweet.id,
              replyerId: tweet.publisher_id,
            });
          },
        }
      );

      console.log('delete reply');
    }

    // RETWEET
    if (!isReply && isRetweet) {
      // if the tweet is a retweet, we delete the retweet, and notify the orifinal tweet of retweet deletion
      console.log(tweet);
      removeTweet(
        { tweetId: tweet.id },
        {
          onSuccess: () => {
            removeRetweetId({ retweetId: tweet.original_tweet_id });
            notifyUserOfUnretweet({
              targetId: tweet.original_tweeter_id,
              tweetId: tweet.original_tweet_id,
            });
          },
        }
      );

      console.log('delete retweet');
    }
  }

  return (
    <StyledTweetHeader>
      <AvatarContainer>
        {user.userAvatar ? (
          <Avatar
            src={user.userAvatar}
            alt={`avatar image of ${user?.userName}`}
          />
        ) : (
          <AvatarPlaceHolder />
        )}
      </AvatarContainer>

      <UsernameContainer>
        <UserName to={`/user/${tweet?.publisher_id}`}>{user.userName}</UserName>
        {isCurrentUser && (
          <OptionsContainer>
            <OptionsButton
              onClick={() => setIsOptionsOpen(isOptionsOpen => !isOptionsOpen)}
            >
              <OptionsIcon />
            </OptionsButton>
            {isOptionsOpen && (
              <Options>
                <DeleteButton onClick={handleDelete}>
                  <DeleteIcon />
                  Delete
                </DeleteButton>
              </Options>
            )}
          </OptionsContainer>
        )}
      </UsernameContainer>
      <PublishTime>{formatDate(tweet?.created_at)}</PublishTime>
    </StyledTweetHeader>
  );
}

export default TweetHeader;
