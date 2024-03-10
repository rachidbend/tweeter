/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAddReply } from '../../hooks/tweet/reply/useAddReply';
import useNotifyTweetOfReply from '../../hooks/tweet/reply/useNotifyTweetOfReply';
import { IconImageOutline } from '../../styles/Icons';
import AvatarPlaceHolder from '../../ui/AvatarPlaceHolder';
import { useUser } from '../../hooks/authHooks/useUser';
import { useGetUserData } from '../../hooks/user/useGetUserData';

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

function TweetReplyInput({ tweet }) {
  const { register, handleSubmit, reset } = useForm();
  const { user: currentUser } = useUser();
  const { userProfile } = useGetUserData(currentUser.id);

  const { addReply } = useAddReply();
  const { notifyOriginalTweetOfReply } = useNotifyTweetOfReply();

  // Handler to add a reply
  const onSubmit = data => {
    // if there is no content, the reply will not be posted
    if (!data.commentText) return;

    // creating the id of the reply
    const date = new Date();
    const id = `${tweet.id}-${currentUser.id}-${date}-reply`;

    // adds the reply as a tweet
    addReply(
      {
        originalTweet: tweet,
        content: data.commentText,
        image: data.commentImage,
        id: id,
      },
      {
        onSuccess: () => {
          // adds the reply into the relpies array inside the original tweet
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

  return (
    <InputContainer>
      {userProfile?.avatar_image ? (
        <UserAvatar src={userProfile?.avatar_image} />
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
  );
}

export default TweetReplyInput;
