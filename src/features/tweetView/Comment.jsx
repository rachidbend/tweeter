/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import Spinner from '../../ui/Spinner';
import { useGetTweet } from '../../hooks/tweet/useGetTweet';
import { Months } from '../../helpers/variables';
import {
  IconDotsHorizontal,
  IconHeartOutline,
  IconTrashOutline,
} from '../../styles/Icons';
import { formatNumber } from '../../helpers/functions';
import { useUser } from '../../hooks/authHooks/useUser';
import { useLikeTweet } from '../../hooks/tweet/useLikeTweet';
import { useNotifyUserOfLike } from '../../hooks/tweet/useNotifyUserOfLike';
import { useRemoveTweetFromLikes } from '../../hooks/tweet/useRemoveTweetFromLikes';
import { useNotifyUserOfUnlike } from '../../hooks/tweet/useNotifyUserOfUnlike';
import AvatarPlaceHolder from '../../ui/AvatarPlaceHolder';
import { useState } from 'react';
import { useRemoveReply } from '../../hooks/tweet/reply/useRemoveReply';
import useNotifyTweetOfReplyRemoval from '../../hooks/tweet/reply/useNotifyTweetOfReplyRemoval';

const StyledComment = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: auto;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 0.8rem;

  object-fit: cover;
  object-position: center;
`;
const Username = styled.p`
  font-family: var(--font-poppings);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-black);
`;
const PostingDate = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-grey-400);
`;
const Content = styled.p`
  font-family: var(--font-noto);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
  letter-spacing: -0.035em;
  color: var(--color-grey-200);
`;

const Container = styled.div``;
const CommentContainer = styled.div`
  background-color: var(--color-grey-700);
  border-radius: 0.8rem;
  padding: 0.9rem 1.5rem 2.2rem 1.5rem;
  margin-bottom: 0.4rem;

  /* box-shadow: var(--shadow-100); */
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.6rem;
`;
const LikeContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: start;
  align-items: center;
`;
const LikeButton = styled.button`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props =>
    props.$isLiked ? 'var(--color-red-100)' : 'var(--color-grey-400)'};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;
const LikeIcon = styled(IconHeartOutline)`
  height: 1.6rem;
  width: 1.6rem;
  color: inherit;
`;
const LikeStat = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-grey-400);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.8rem;
`;
const AvatarContainer = styled.div``;

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

function Comment({ reply }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { userProfile: originalTweeter, isLoading } = useGetUserData(
    reply.replyer_id
  );
  const { user } = useUser();
  const { userProfile, isLoading: isLoadingUser } = useGetUserData(user.id);
  const { tweet, isLoading: isLoadingTweet } = useGetTweet({
    tweetId: reply.reply_id,
    publisherId: reply.replyer_id,
  });

  const isCurrentUser = user.id === reply.replyer_id;

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

  // removing the reply handlers
  const { removeReply } = useRemoveReply();
  const { notifyOriginalTweetOfReplyRemoval } = useNotifyTweetOfReplyRemoval();

  function handleDelete() {
    // setIsOptionsOpen(false);
    if (!isCurrentUser) return;
    removeReply(
      { replyId: reply.reply_id },
      {
        onSuccess: () => {
          notifyOriginalTweetOfReplyRemoval({
            originalTweetID: tweet.original_tweet_id,
            originalTweeterId: tweet.original_tweeter_id,
            replyID: reply.reply_id,
            replyerId: reply.replyer_id,
          });
        },
      }
    );
  }

  if (isLoading || isLoadingTweet || isLoadingUser) return <Spinner />;
  const publishingData = new Date(tweet.created_at);
  const publishingText = `${publishingData.getDate()} ${
    Months[publishingData.getMonth()]
  } at ${publishingData.getHours()}:${publishingData.getMinutes()}`;

  const isLiked =
    userProfile?.likes?.filter(like => like.id === tweet.id).length > 0;

  return (
    <StyledComment>
      <AvatarContainer>
        {originalTweeter?.avatar_image ? (
          <Avatar
            src={originalTweeter?.avatar_image}
            alt={`avatar image of ${user.userName}`}
          />
        ) : (
          <AvatarPlaceHolder />
        )}
      </AvatarContainer>
      <Container>
        <CommentContainer>
          <Header>
            <Username>{originalTweeter.user_name}</Username>
            <PostingDate>{publishingText}</PostingDate>
            {isCurrentUser && (
              <OptionsContainer>
                <OptionsButton
                  onClick={() =>
                    setIsOptionsOpen(isOptionsOpen => !isOptionsOpen)
                  }
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
          </Header>
          <Content>{tweet.content}</Content>
          {tweet.image !== '' && <Image src={tweet.image} />}
        </CommentContainer>
        <LikeContainer>
          <LikeButton
            $isLiked={isLiked}
            onClick={isLiked ? handleUnlike : handleLike}
          >
            <LikeIcon />
            {isLiked ? 'Liked' : 'Like'}
          </LikeButton>
          ·<LikeStat>{formatNumber(tweet.likes.length)} Likes</LikeStat>
        </LikeContainer>
      </Container>
    </StyledComment>
  );
}

export default Comment;

const obs = {
  id: 'b9628375-9682-4879-a408-45e7e2b8b9db-1710004633401-b9628375-9682-4879-a408-45e7e2b8b9db-Sat Mar 09 2024 19:01:29 GMT+0100 (GMT+01:00)-reply',
  image: '',
  likes: [],
  saves: [],
  content: 'this is a reply',
  isReply: true,
  replies: [],
  hashtags: [],
  retweets: [],
  isRetweet: false,
  created_at: '2024-03-09T18:01:29.627Z',
  publisher_id: 'b9628375-9682-4879-a408-45e7e2b8b9db',
  original_tweet_id: 'b9628375-9682-4879-a408-45e7e2b8b9db-1710004633401',
  original_tweeter_id: 'b9628375-9682-4879-a408-45e7e2b8b9db',
};
