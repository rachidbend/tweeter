/* eslint-disable react/prop-types */
import styled from 'styled-components';
import {
  IconBookMarkOutline,
  IconCommentOutline,
  IconHeartOutline,
  IconImageOutline,
  IconSync,
} from '../styles/Icons';
import { useForm } from 'react-hook-form';

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
const Button = styled.button`
  font-family: var(--font-noto);
  width: 100%;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  padding: 1.1rem 0;
  color: var(--color-grey-200);
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

const ButtonText = styled.span`
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const CommentIcon = styled(IconCommentOutline)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;
const RetweetIcon = styled(IconSync)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;
const LikeIcon = styled(IconHeartOutline)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;
const SaveIcon = styled(IconBookMarkOutline)`
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

  &::placeholder {
    color: var(--color-grey-400);
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

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
function Tweet({ currentUserAvatar, user, tweet }) {
  // userAvatar: userProfile.avatar_image,
  // userName: userProfile.user_name,
  const publishingData = new Date(tweet.created_at);
  const publishingText = `${publishingData.getDate()} ${
    Months[publishingData.getMonth()]
  } at ${publishingData.getHours()}:${publishingData.getMinutes()}`;

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    console.log(data);
    reset();
  };

  return (
    <StyledTweet>
      {/*
        avatar image
        userName
        publishing date of the tweet

        text content of the tweet
        image included in the tweet if any

        a small section to show how many comments, retweets and saves the tweet has

        a section for commenting, retweeting, liking, and saving the tweet

        an input to comment

        some of the commnets on the tweet
        */}
      <Header>
        <Avatar
          src={user.userAvatar}
          alt={`avatar image of ${user.userName}`}
        />
        <UserName>{user.userName}</UserName>
        <PublishTime>{publishingText}</PublishTime>
      </Header>
      <Content>
        <TextContent>{tweet.content}</TextContent>
        {tweet.image.length > 0 && <ImageContent src={tweet.image} />}
      </Content>
      <StatContainer>
        <Stat>{tweet.comments.length} Comment</Stat>
        <Stat>{tweet.retweets.length} Retweets</Stat>
        <Stat>{tweet.saves.length} Saved</Stat>
      </StatContainer>
      <ButtonsContainer>
        <Button>
          <CommentIcon />
          <ButtonText>Comment</ButtonText>
        </Button>
        <Button>
          <RetweetIcon />
          <ButtonText>Retweet</ButtonText>
        </Button>
        <Button>
          <LikeIcon />
          <ButtonText>Like</ButtonText>
        </Button>
        <Button>
          <SaveIcon />
          <ButtonText>Save</ButtonText>
        </Button>
      </ButtonsContainer>
      <InputContainer>
        <UserAvatar src={currentUserAvatar} />
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
    </StyledTweet>
  );
}

export default Tweet;
