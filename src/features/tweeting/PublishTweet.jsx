import { useState } from 'react';
import styled from 'styled-components';

import { useAddTweet } from '../../hooks/tweet/useAddTweet';
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/authHooks/useUser';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import Spinner from '../../ui/Spinner';
import SmallSpinner from '../../ui/SmallSpinner';
import AvatarDisplay from './AvatarDisplay';
import UploadTweetImage from './UploadTweetImage';
import TweetReplyVisibility from './TweetReplyVisibility';
import PublishTweetInput from './PublishTweetInput';

const StyledTweet = styled.div`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  box-shadow: var(--shadow-100);

  padding: 1.1rem 2rem;

  font-family: var(--font-noto);
  /* margin-bottom: 5rem; */
  margin-bottom: 2.4rem;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

const Heading = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-200);
  letter-spacing: -0.035em;
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
  border-bottom: 0.1rem solid var(--color-grey-500);
`;

const ContainerForm = styled.form`
  display: grid;
  column-gap: 1.2rem;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: auto auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  grid-column: 2 / 3;

  @media screen and (max-width: 450px) {
    grid-column: 1 / 3;
  }
`;

const ImageAndVisibilityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TweetButton = styled.button`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  text-transform: capitalize;
  color: var(--color-white);
  background-color: var(--color-blue-100);
  border: 0.2rem solid var(--color-blue-100);
  padding: 0.6rem 2.2rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background var(--transition-100), color var(--transition-100);
  width: 8rem;
  &:hover {
    color: var(--color-blue-100);
    background-color: var(--color-white);
  }

  &:disabled {
    cursor: no-drop;
  }
`;

const PreviewImage = styled.img`
  height: auto;
  width: 50%;

  border-radius: 0.8rem;

  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

/********************
Add hashtag features
********************/

function PublishTweet() {
  const [image, setImage] = useState(null);
  const [replyChoice, setReplyChoice] = useState('everyone');
  const { addTweet, isPending: isTweeting } = useAddTweet();
  const { register, handleSubmit, reset } = useForm();

  const { user } = useUser();
  const { userProfile, isLoading } = useGetUserData(user.id);

  function onSubmit(data) {
    const newTweet = {
      reply: replyChoice,
      content: data.content,
      image: data.image,
      hashtags: [],
    };
    addTweet(newTweet, { onSuccess: () => reset() });
    setImage(null);
  }

  if (isLoading) return <Spinner />;

  return (
    <StyledTweet>
      <Heading>Tweet something</Heading>
      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <AvatarDisplay avatarImage={userProfile.avatar_image} />
        <div>
          <PublishTweetInput register={register} />
          {image && <PreviewImage src={image} />}
        </div>
        <ButtonsContainer>
          <ImageAndVisibilityContainer>
            <UploadTweetImage register={register} onImageChange={setImage} />
            <TweetReplyVisibility
              replyChoice={replyChoice}
              onChoiceChange={setReplyChoice}
            />
          </ImageAndVisibilityContainer>
          <TweetButton disabled={isTweeting}>
            {isTweeting ? <SmallSpinner /> : 'tweet'}
          </TweetButton>
        </ButtonsContainer>
      </ContainerForm>
    </StyledTweet>
  );
}

export default PublishTweet;
