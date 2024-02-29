import { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineImage } from 'react-icons/md';
import { PiGlobeHemisphereWestFill } from 'react-icons/pi';
import { useAddTweet } from '../../hooks/tweet/useAddTweet';
import { AnimatePresence } from 'framer-motion';
import ReplyDropDown from './ReplyDropDown';
import { useForm } from 'react-hook-form';

const StyledTweet = styled.div`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  box-shadow: var(--shadow-100);

  padding: 1.1rem 2rem;

  font-family: var(--font-noto);

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
const Avatar = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 0.8rem;
`;
const Input = styled.textarea`
  width: 100%;
  resize: none;
  height: 6rem;
  font-family: var(--font-noto);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  letter-spacing: -0.035em;
  color: var(--color-grey-100);
  background: none;
  border: none;
  outline: none;
  margin-top: 0.9rem;
  &::placeholder {
    color: var(--color-grey-400);
  }
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

const Image = styled.label`
  display: flex;
  align-items: center;

  margin-right: 0.967rem;
`;
const ImageIcon = styled(MdOutlineImage)`
  height: 2rem;
  width: 2rem;
  color: var(--color-grey-400);
  cursor: pointer;

  transition: color var(--transition-200);
  &:hover {
    color: var(--color-blue-100);
  }
`;
const UploadImage = styled.input`
  height: 1px;
  width: 1px;
  visibility: hidden;
`;

const VisibilityButtonContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-grey-400);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  position: relative;
  transition: color var(--transition-200);
  &:hover {
    color: var(--color-blue-100);
  }
`;

const GlobeIcon = styled(PiGlobeHemisphereWestFill)`
  height: 2rem;
  width: 2rem;
  color: inherit;
  cursor: pointer;
  margin-right: 0.55rem;
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

  &:hover {
    color: var(--color-blue-100);
    background-color: var(--color-white);
  }

  &:disabled {
    cursor: no-drop;
  }
`;

/********************
Add hashtag features
********************/

function Tweet() {
  const [isOpen, setIsOpen] = useState(false);
  const [replyChoice, setReplyChoice] = useState('everyone');
  const { addTweet, isPending } = useAddTweet();

  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    const newTweet = {
      reply: replyChoice,
      content: data.content,
      image: data.image,
      hashtags: [],
    };
    addTweet(newTweet, { onSuccess: () => reset() });
  }

  function handleReplyClick() {
    setIsOpen(isOpen => !isOpen);
  }

  function handleChooseReply(choice) {
    setReplyChoice(choice);
  }

  return (
    <StyledTweet>
      <Heading>Tweet something</Heading>
      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <Avatar src="/images/avatar.jpg" />

        <Input
          type="text"
          placeholder={`What’s happening?`}
          {...register('content', { required: true })}
        />
        <ButtonsContainer>
          <ImageAndVisibilityContainer>
            <Image htmlFor="tweet-image-upload">
              <ImageIcon />
            </Image>
            <UploadImage
              id="tweet-image-upload"
              type="file"
              {...register('image')}
            />
            <VisibilityButtonContainer onClick={handleReplyClick}>
              <GlobeIcon /> {replyChoice === 'everyone' && 'Everyone can reply'}
              {replyChoice === 'following' && 'People you follow can reply'}
              <AnimatePresence>
                {isOpen && <ReplyDropDown onChooseReply={handleChooseReply} />}
              </AnimatePresence>
            </VisibilityButtonContainer>
          </ImageAndVisibilityContainer>
          <TweetButton disabled={isPending}>tweet</TweetButton>
        </ButtonsContainer>
      </ContainerForm>
    </StyledTweet>
  );
}

export default Tweet;
