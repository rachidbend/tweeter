import { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineImage } from 'react-icons/md';
import { PiGlobeHemisphereWestFill } from 'react-icons/pi';

const StyledTweet = styled.div`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  box-shadow: var(--shadow-100);

  padding: 1.1rem 2rem;

  font-family: var(--font-noto);
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
const Submit = styled.input``;

const Container = styled.div`
  display: flex;
  gap: 1.2rem;
`;
const InputContainer = styled.div`
  width: 100%;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const VisibilityContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-grey-400);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
`;

const GlobeIcon = styled(PiGlobeHemisphereWestFill)`
  height: 2rem;
  width: 2rem;
  color: var(--color-grey-400);
  cursor: pointer;
  margin-right: 0.55rem;
  transition: color var(--transition-200);
  &:hover {
    color: var(--color-blue-100);
  }
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
  cursor: pointer;
  padding: 0.6rem 2.2rem;
  border-radius: 0.4rem;

  &:hover {
    color: var(--color-blue-100);
    background-color: var(--color-white);
  }
`;

function Tweet() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledTweet>
      <Heading>Tweet something</Heading>
      <Container>
        <Avatar src="/images/avatar.jpg" />

        <InputContainer>
          <Input type="text" placeholder={`What’s happening?`} />
          <ButtonsContainer>
            <ImageAndVisibilityContainer>
              <Image htmlFor="tweet-image-upload">
                <ImageIcon />
              </Image>
              <UploadImage id="tweet-image-upload" type="file" />
              <VisibilityContainer>
                <GlobeIcon /> Everyone can reply
              </VisibilityContainer>
            </ImageAndVisibilityContainer>
            <TweetButton>tweet</TweetButton>
          </ButtonsContainer>
        </InputContainer>
      </Container>
    </StyledTweet>
  );
}

export default Tweet;
