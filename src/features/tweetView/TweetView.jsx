/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { IconCommentOutline, IconImageOutline } from '../../styles/Icons';
import { useForm } from 'react-hook-form';
import { Months } from '../../helpers/variables';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import { useUser } from '../../hooks/authHooks/useUser';
import AvatarPlaceHolder from '../../ui/AvatarPlaceHolder';
import RetweetView from '../../ui/RetweetView';
import TweetLikeButton from './TweetLikeButton';
import TweetSaveButton from './TweetSaveButton';
import TweetRetweetButton from './TweetRetweetButton';
import { useAddReply } from '../../hooks/tweet/reply/useAddReply';
import useNotifyTweetOfReply from '../../hooks/tweet/reply/useNotifyTweetOfReply';
import { Link } from 'react-router-dom';
import Comment from './Comment';

const StyledTweet = styled.div`
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: var(--shadow-100);
`;

// header
const Header = styled.div`
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
const UserName = styled.p`
  font-family: var(--font-poppings);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-black);
`;
const PublishTime = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-400);
  letter-spacing: -0.035em;
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
const StatContainer = styled.div`
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

// buttons (Comment, retweet, like, save)
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.704rem;
  padding-bottom: 0.4rem;
  border-bottom: 0.1rem solid var(--color-grey-600);
  margin-bottom: 0.9rem;
`;

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

  transition: background var(--transition-300), color var(--transition-300);
  &:hover {
    background-color: var(--color-grey-600);
  }
`;

export const ButtonText = styled.span`
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const CommentIcon = styled(IconCommentOutline)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;

// input for the current user to add a comment
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;

  gap: 1.622rem;
`;
const UserAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 0.8rem;
  object-fit: cover;
  object-position: center;
`;

const CommentInput = styled.input`
  height: 100%;
  width: 100%;
  border: 0.1rem solid var(--color-grey-600);
  border-radius: 0.8rem;
  padding: 0 1.2rem;
  background-color: var(--color-grey-700);

  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: -0.035em;
  color: var(--color-grey-200);
  outline: none;
  transition: border var(--transition-200);
  &::placeholder {
    color: var(--color-grey-400);
  }

  &:hover,
  &:focus {
    border: 0.1rem solid var(--color-blue-100);
  }
`;
const ImageInputContainer = styled.div``;
const UploadImageLabel = styled.label`
  color: var(--color-grey-400);
  cursor: pointer;
  transition: color var(--transition-200);
  position: absolute;
  top: 50%;
  right: 0.75rem;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  transform: translateY(-50%);
  &:hover {
    color: var(--color-blue-100);
  }
`;
const ImageIcon = styled(IconImageOutline)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;
const UploadImage = styled.input`
  height: 0px;
  width: 0px;
  opacity: 0;
  visibility: hidden;
`;

const CommentContainer = styled.form`
  position: relative;
`;

// section that includes some of the most liked comments
const Comments = styled.div``;

const RetweetContainer = styled.div`
  margin-left: 4rem;
  border-left: 2px solid var(--color-grey-300);
  padding-left: 2.4rem;
`;

const ReplyingTo = styled.p`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-grey-300);
  margin-left: 6rem;
  margin-bottom: 1.2rem;
`;
const ReplyingToUserName = styled(Link)`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: var(--color-grey-100);
  margin-left: 0.6rem;
`;

const RepliesContainer = styled.div`
  margin-top: 1rem;
  border-top: 0.1rem solid var(--color-grey-600);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function TweetView({ currentUserAvatar, user, tweet }) {
  // userAvatar: userProfile.avatar_image,
  // userName: userProfile.user_name,
  const publishingData = new Date(tweet.created_at);
  const publishingText = `${publishingData.getDate()} ${
    Months[publishingData.getMonth()]
  } at ${publishingData.getHours()}:${publishingData.getMinutes()}`;

  const { user: currentUser } = useUser();
  const { userProfile } = useGetUserData(currentUser.id);
  const { register, handleSubmit, reset } = useForm();

  const getThisProfile = tweet?.original_tweeter_id && currentUser.id;
  const { userProfile: originalTweeter } = useGetUserData(getThisProfile);
  const { addReply } = useAddReply();
  const { notifyOriginalTweetOfReply } = useNotifyTweetOfReply();
  const onSubmit = data => {
    if (!data.commentText) return;
    console.log(data);
    const date = new Date();
    const id = `${tweet.id}-${currentUser.id}-${date}-reply`;
    addReply(
      {
        originalTweet: tweet,
        content: data.commentText,
        image: data.commentImage,
        id: id,
      },
      {
        onSuccess: () => {
          notifyOriginalTweetOfReply({
            tweet_id: tweet.id,
            tweeter_id: tweet.publisher_id,
            reply_id: id,
            replyer_id: currentUser.id,
          });
        },
      }
    );

    reset();
  };

  // states
  const isSaved =
    userProfile?.bookmarks?.filter(bookmark => bookmark.id === tweet.id)
      .length > 0;
  const isLiked =
    userProfile?.likes?.filter(like => like.id === tweet.id).length > 0;
  const isRetweeted =
    userProfile?.retweets?.filter(id => id === tweet.id).length > 0;

  return (
    <StyledTweet>
      <Header>
        <AvatarContainer>
          {user.userAvatar ? (
            <Avatar
              src={user.userAvatar}
              alt={`avatar image of ${user.userName}`}
            />
          ) : (
            <AvatarPlaceHolder />
          )}
        </AvatarContainer>

        <UserName>{user.userName}</UserName>
        <PublishTime>{publishingText}</PublishTime>
      </Header>
      <Content>
        {/* when a tweet is a reply */}
        {tweet.isReply && (
          <ReplyingTo>
            replying to:
            <ReplyingToUserName to={`/user/${originalTweeter?.id}`}>
              {originalTweeter?.user_name}
            </ReplyingToUserName>
          </ReplyingTo>
        )}
        <TextContent>{tweet.content}</TextContent>
        {tweet.image.length > 0 && <ImageContent src={tweet.image} />}
      </Content>

      {tweet.isRetweet && (
        <RetweetContainer>
          <RetweetView
            tweetId={tweet?.originalTweetId}
            publisherId={tweet?.originalTweetPublishdeId}
          />
        </RetweetContainer>
      )}
      <StatContainer>
        <Stat>{tweet.likes.length} Likes</Stat>
        <Stat>{tweet.replies.length} Comment</Stat>
        <Stat>{tweet.retweets.length} Retweets</Stat>
        <Stat>{tweet.saves.length} Saved</Stat>
      </StatContainer>
      <ButtonsContainer>
        <Button>
          <CommentIcon />
          <ButtonText>Comment</ButtonText>
        </Button>

        {/* tweet RETWEET button */}
        <TweetRetweetButton
          isRetweeted={isRetweeted}
          tweet={tweet}
          currentUser={currentUser}
        />
        {/* tweet LIKE button */}
        <TweetLikeButton isLiked={isLiked} tweet={tweet} />

        {/* tweet SAVE button */}
        <TweetSaveButton isSaved={isSaved} tweet={tweet} />
      </ButtonsContainer>
      <InputContainer>
        {currentUserAvatar ? (
          <UserAvatar src={currentUserAvatar} />
        ) : (
          <AvatarPlaceHolder />
        )}

        <CommentContainer onSubmit={handleSubmit(onSubmit)}>
          <CommentInput
            placeholder="Tweet your reply"
            type="text"
            {...register('commentText', { required: true })}
          />
          <ImageInputContainer>
            <UploadImageLabel htmlFor={`image-input-${tweet.id}`}>
              <ImageIcon />
            </UploadImageLabel>
            <UploadImage
              type="file"
              id={`image-input-${tweet.id}`}
              {...register('commentImage')}
            />
          </ImageInputContainer>
        </CommentContainer>
      </InputContainer>
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

// how would a comment inside a tweet look like
// const comment = {
//   id,
//   commented_at,
//   text,
//   image,
//   likes: [
//     {
//       id,
//       liker_id,
//       liked_at,
//     },
//   ],
// };
const tweet = {
  id: 'b9628375-9682-4879-a408-45e7e2b8b9db-1709910856467',
  image: '',
  likes: ['b9628375-9682-4879-a408-45e7e2b8b9db'],
  saves: ['b9628375-9682-4879-a408-45e7e2b8b9db'],
  content: 'heeeyooooo',
  replies: [
    {
      reply_id: '',
      replyer_id: '',
    },
  ],
  hashtags: [],
  retweets: [
    {
      retweet_id: 'b9628375-9682-4879-a408-45e7e2b8b9db-1709978281556-retweet',
      retweeter_id: 'b9628375-9682-4879-a408-45e7e2b8b9db',
    },
  ],
  isRetweet: false,
  created_at: '2024-03-08T15:14:16.467Z',
  publisher_id: 'b9628375-9682-4879-a408-45e7e2b8b9db',
};

const replyTweet = {
  id: 'b9628375-9682-4879-a408-45e7e2b8b9db-1709910856467-reply',
  image: '',
  likes: ['b9628375-9682-4879-a408-45e7e2b8b9db'],
  saves: ['b9628375-9682-4879-a408-45e7e2b8b9db'],
  content: 'heeeyooooo',
  comments: [
    {
      comment_id: '',
      commenter_id: '',
    },
  ],
  hashtags: [],
  retweets: [
    {
      retweet_id: 'b9628375-9682-4879-a408-45e7e2b8b9db-1709978281556-retweet',
      retweeter_id: 'b9628375-9682-4879-a408-45e7e2b8b9db',
    },
  ],
  isRetweet: false,
  isReply: true,
  created_at: '2024-03-08T15:14:16.467Z',
  publisher_id: 'b9628375-9682-4879-a408-45e7e2b8b9db',
  original_tweet_id: 'b9628375-9682-4879-a408-45e7e2b8b9db-1709910856467',
};

// to add a reply, the user inputs some text, and optionaly an image, and hits enter
// the reply gets tweeted, and the original tweet is notified of the reply
// to notify the original tweet, an object including the id of the reply and of the replyer, is added into the replies array inside of the tweet

// if a tweet is a reply, indicated by the "isReply=true" property, fetch the original tweet, and display it above the reply itself, while indicating that it is a reply to another tweet

// when viewing a tweet, if it has replies, then display the most recent, or most liked replies to it, by fetching them from the replies array and displaying the appropriate data.
