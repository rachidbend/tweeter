/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../../helpers/functions';
import AvatarPlaceHolder from '../../ui/AvatarPlaceHolder';
import { useRef, useState } from 'react';
import {
  IconDotsHorizontal,
  IconEdit,
  IconTrashOutline,
} from '../../styles/Icons';
import { useUser } from '../../hooks/authHooks/useUser';
import { useRemoveTweet } from '../../hooks/tweet/useRemovetweet';
import useRemoveTweetId from '../../hooks/tweet/useRemoveTweetId';
import { useNotifyUserOfRetweetRemove } from '../../hooks/tweet/retweet/useNotifyUserOfRetweetRemove';
import useNotifyTweetOfReplyRemoval from '../../hooks/tweet/reply/useNotifyTweetOfReplyRemoval';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import OutsideClick from '../../helpers/OutsideClick';
import useDeleteImage from '../../hooks/useDeleteImage';
import TweetViewHeaderSkeletal from '../../ui/SkeletalUI/tweet/TweetViewHeaderSkeletal';

const StyledTweetHeader = styled.div`
  display: grid;
  grid-template-columns: 4rem auto;
  grid-template-rows: auto auto;
  column-gap: 1.75rem;
  margin-bottom: 0.6rem;
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
  transition: color var(--transition-200), text-decoration var(--transition-200);

  text-decoration: underline;
  text-decoration-color: transparent;
  text-decoration-thickness: 0.1rem;
  text-underline-offset: 0.4rem;

  &:hover {
    text-decoration-color: var(--color-grey-400);
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
const Options = styled(motion.div)`
  position: absolute;
  right: 0;
  background-color: var(--color-white);
  padding: 0.8rem;
  border-radius: 0.8rem;
  border: 0.1rem solid var(--color-grey-600);
  box-shadow: var(--shadow-100);

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.8rem;
`;

const Button = styled.button`
  font-family: var(--font-noto);
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.8rem;
  background: none;
  border: none;
  padding: 0.8rem 1.6rem;
  width: 100%;
  border-radius: 0.6rem;

  transition: var(--transition-200);
  &:hover {
    background-color: var(--color-grey-600);
  }
`;

const DeleteButton = styled(Button)`
  color: var(--color-red-100);
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

const EditButton = styled(Button)`
  color: var(--color-grey-300);
`;
const EditIcon = styled(IconEdit)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
`;

// Component for rendering the header of a tweet
function TweetHeader({ tweet }) {
  const headerRef = useRef();
  // State for managing the visibility of the options list
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { userProfile, isLoading } = useGetUserData(tweet.publisher_id);
  // Getting the current user's info
  const { user: currentUser } = useUser();

  // States that are required to function properly
  const isCurrentUser = tweet.publisher_id === currentUser.id;
  const isRetweet = tweet.isRetweet;
  const isReply = tweet.isReply;

  // Custom hooks for deleting a tweet
  const { removeTweet } = useRemoveTweet();
  const { removeRetweetId } = useRemoveTweetId();
  const { notifyUserOfUnretweet } = useNotifyUserOfRetweetRemove();
  const { notifyOriginalTweetOfReplyRemoval } = useNotifyTweetOfReplyRemoval();
  const { deleteImage } = useDeleteImage();

  // Function to handle tweet deletion
  function handleDelete() {
    // NORMAL tweet
    if (!isReply && !isRetweet) {
      // If the tweet is a normal tweet, we delete it
      removeTweet({ tweetId: tweet.id });
      if (tweet.image)
        deleteImage({ bucketName: 'tweet_images', imageUrl: tweet.image });
    }

    // REPLY tweet
    if (isReply && !isRetweet) {
      // If the tweet is a reply, we delete the reply, and we notify the original tweet of the reply deletion

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
            if (tweet.image)
              deleteImage({
                bucketName: 'tweet_images',
                imageUrl: tweet.image,
              });
          },
        }
      );
    }

    // RETWEET
    if (!isReply && isRetweet) {
      // If the tweet is a retweet, we delete the retweet, and notify the original tweet of retweet deletion

      removeTweet(
        { tweetId: tweet.id },
        {
          onSuccess: () => {
            removeRetweetId({ retweetId: tweet.original_tweet_id });
            notifyUserOfUnretweet({
              targetId: tweet.original_tweeter_id,
              tweetId: tweet.original_tweet_id,
            });
            if (tweet.image)
              deleteImage({
                bucketName: 'tweet_images',
                imageUrl: tweet.image,
              });
          },
        }
      );
    }
  }

  if (isLoading) return <TweetViewHeaderSkeletal />;

  return (
    <StyledTweetHeader ref={headerRef}>
      <OutsideClick
        onClose={() => setIsOptionsOpen(false)}
        componentRef={headerRef}
      />
      {/* Avatar image */}
      <AvatarContainer>
        {userProfile.avatar_image ? (
          <Avatar
            src={userProfile.avatar_image}
            alt={`avatar image of ${userProfile.avatar_image}`}
          />
        ) : (
          <AvatarPlaceHolder />
        )}
      </AvatarContainer>

      {/* username  */}
      <UsernameContainer>
        <UserName to={`/user/${tweet?.publisher_id}`}>
          {userProfile.user_name}
        </UserName>
        {/* if the current user is the owner of the tweet, he can see the following options list */}
        {isCurrentUser && (
          <OptionsContainer>
            {/* button to toggle options list visibility */}
            <OptionsButton
              onClick={() => setIsOptionsOpen(isOptionsOpen => !isOptionsOpen)}
            >
              <OptionsIcon />
            </OptionsButton>
            {/* list of options */}
            <AnimatePresence>
              {isOptionsOpen && (
                <Options
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >
                  <DeleteButton onClick={handleDelete}>
                    <DeleteIcon />
                    Delete
                  </DeleteButton>
                  <EditButton>
                    <EditIcon />
                    Edit
                  </EditButton>
                </Options>
              )}
            </AnimatePresence>
          </OptionsContainer>
        )}
      </UsernameContainer>
      {/* formated time of creation of the tweet  */}
      <PublishTime>{formatDate(tweet?.created_at)}</PublishTime>
    </StyledTweetHeader>
  );
}

export default TweetHeader;
