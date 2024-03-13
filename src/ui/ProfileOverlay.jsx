/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { IconAddImage, IconClose, IconSave } from '../styles/Icons';
import { motion } from 'framer-motion';

const Overlay = styled(motion.div)`
  height: 100vh;
  height: 100svh;
  width: 100%;
  background-color: var(--color-background-overlay);
  /* opacity: 0.4; */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  @media screen and (max-width: 450px) {
    /* padding: 0 2.4rem; */
  }
`;

const StyledProfileOverlay = styled.div`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  padding: 2rem 2.2rem;
  box-shadow: var(--shadow-100);
  border: 0.1rem solid var(--color-grey-400);
  width: 60rem;

  @media screen and (max-width: 450px) {
    width: 100%;
    height: 100vh;
    height: 100svh;
    border-radius: 0;
  }
`;

// HEADER
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding-bottom: 0.8rem;
  margin-bottom: 2.4rem;
  border-bottom: 0.1rem solid var(--color-grey-500);
`;

const CloseButton = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  color: var(--color-grey-100);
  transition: color var(--transition-200);

  &:hover {
    color: var(--color-blue-100);
  }
`;

const CloseIcon = styled(IconClose)`
  height: 2.4rem;
  width: 2.4rem;
  color: inherit;
`;

const Heading = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  text-transform: capitalize;
  color: var(--color-grey-200);
`;

const SaveButton = styled.button`
  border: 0.2rem solid var(--color-blue-100);
  padding: 0.38rem 1.3rem 0.52rem 1.2rem;
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  letter-spacing: -0.035em;
  font-weight: 500;
  text-transform: capitalize;
  background-color: var(--color-blue-100);
  border-radius: 0.4rem;
  cursor: pointer;
  margin-left: auto;
  color: var(--color-white);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  transition: color var(--transition-200), background var(--transition-200);

  &:hover {
    color: var(--color-blue-100);
    background-color: transparent;
  }
`;

const SaveIcon = styled(IconSave)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
`;

// BACKGROUND image

const BackgroundContainer = styled.div`
  /* margin: 0 -2.2rem; */
  position: relative;

  padding-bottom: 1.4rem;
  margin-bottom: 2.4rem;
  border-bottom: 0.1rem solid var(--color-grey-500);
`;

const BackgroundImage = styled.img`
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
  object-position: center;
  border-radius: 1.2rem;

  @media screen and (max-width: 450px) {
    max-height: 14rem;
  }
`;

const ImageLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;

  height: 4.6rem;
  width: 4.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  /* border: 0.2rem solid var(--color-white); */

  cursor: pointer;
  transition: color var(--transition-200), background var(--transition-200),
    border var(--transition-200);

  color: var(--color-blue-100);
  background-color: rgba(0, 0, 0, 0.5);

  &:hover {
    color: var(--color-white);
    background-color: var(--color-blue-100);
  }
`;

const ImageInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  appearance: hidden;
`;

const AddPhotoIcon = styled(IconAddImage)`
  height: 2.4rem;
  width: 2.4rem;
  color: inherit;
`;

// AVATAR image
const AvatarContainer = styled.div`
  /* position: relative; */
  width: fit-content;
  display: inline-block;
  position: relative;
`;

const AvatarImage = styled.img`
  height: 12rem;
  width: 12rem;
  object-fit: cover;
  object-position: center;
  border-radius: 0.8rem;
  border: 0.2rem solid var(--color-white);

  @media screen and (max-width: 450px) {
    height: 10rem;
    width: 10rem;
  }
`;

// CONTAINER
const Container = styled.div`
  display: flex;
  align-items: start;
  gap: 2.4rem;

  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

// INPUTS
const TextLabels = styled.label`
  display: inline-block;
  color: var(--color-grey-200);
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  margin-bottom: 0.6rem;
  padding-left: 0.4rem;
`;

const UserNameInput = styled.input`
  width: 100%;
  display: block;
  border: 0.2rem solid var(--color-grey-400);
  background-color: var(--color-grey-700);
  border-radius: 0.8rem;
  padding: 1.05rem 1.2rem;
  color: var(--color-grey-100);
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  margin-bottom: 2.4rem;
  outline: none;

  &:hover,
  &:active {
    border: 0.2rem solid var(--color-blue-100);
  }
`;
const DescriptionInput = styled.textarea`
  width: 100%;
  height: 7rem;
  border: 0.2rem solid var(--color-grey-400);
  background-color: var(--color-grey-700);
  border-radius: 0.8rem;
  padding: 1.05rem 1.2rem;
  color: var(--color-grey-100);
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.9rem;
  letter-spacing: -0.035em;

  &:hover,
  &:active {
    border: 0.2rem solid var(--color-blue-100);
  }
`;

const TextInputsContainer = styled.div`
  width: 100%;
  padding-left: 2.4rem;
  border-left: 0.1rem solid var(--color-grey-500);

  @media screen and (max-width: 450px) {
    padding-left: 0;
    border: none;
  }
`;

function ProfileOverlay({ onOpen, onClose, profileData }) {
  return (
    <Overlay
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
      <StyledProfileOverlay>
        <Header>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
          <Heading>edit profile</Heading>
          <SaveButton>
            <SaveIcon /> save
          </SaveButton>
        </Header>

        <BackgroundContainer className="background image">
          <BackgroundImage
            src={profileData.background_image}
            alt="background image"
          />
          <ImageLabel htmlFor="profile-background-image-input">
            <AddPhotoIcon />
          </ImageLabel>
          <ImageInput type="file" id="profile-background-image-input" />
        </BackgroundContainer>

        <Container className="container">
          <AvatarContainer className="avatar container">
            <AvatarImage src={profileData.avatar_image} alt="avatar image" />
            <ImageLabel>
              <AddPhotoIcon />
            </ImageLabel>
            <ImageInput type="file" />
          </AvatarContainer>

          <TextInputsContainer>
            <TextLabels>Name:</TextLabels>
            <UserNameInput
              type="text"
              name="username"
              placeholder="Your name"
            />
            <TextLabels>Description:</TextLabels>
            <DescriptionInput
              name="description"
              placeholder="Describe yourself"
            />
          </TextInputsContainer>
        </Container>
      </StyledProfileOverlay>
    </Overlay>
  );
}

export default ProfileOverlay;
