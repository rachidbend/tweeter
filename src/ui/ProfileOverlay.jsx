/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { IconAddImage, IconClose, IconSave } from '../styles/Icons';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useUpdateUser from '../hooks/useUpdateUser';
import AvatarPlaceHolder from './AvatarPlaceHolder';
import SmallSpinner from './SmallSpinner';
import { useRef } from 'react';
import useDeleteImage from '../hooks/useDeleteImage';
import OutsideClick from '../helpers/OutsideClick';

const Overlay = styled(motion.div)`
  /* height: 100vh;
  height: 100svh; */

  overflow: hidden;
  width: 100%;
  background-color: var(--color-background-overlay);

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StyledProfileOverlay = styled.div`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  padding: 2rem 2.2rem;
  box-shadow: var(--shadow-100);
  border: 0.1rem solid var(--color-grey-400);
  width: 60rem;

  @media screen and (max-width: 450px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    /* min-height: 100vh;
    min-height: 100svh; */
    border-radius: 0;
  }
`;

// HEADER
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
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

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: var(--color-blue-100);
  }
`;

const CloseIcon = styled(IconClose)`
  height: 2.2rem;
  width: 2.2rem;
  color: inherit;
`;

const Heading = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.8rem;
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

    span {
      border: 0.2rem solid var(--color-blue-100);
      border-bottom-color: var(--color-white);
    }
  }
`;

const SaveIcon = styled(IconSave)`
  height: 1.4rem;
  width: 1.4rem;
  color: inherit;
`;

// BACKGROUND image

const BackgroundContainer = styled.div`
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

// placeholder for the background image
const BackgroundImagePlaceHolder = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 1.2rem;
  background-color: var(--color-grey-400);

  font-family: var(--font-poppings);
  font-size: 1.4rem;
  letter-spacing: -0.035em;
  font-weight: 500;
  text-transform: capitalize;

  display: flex;
  justify-content: center;
  padding-top: 4.8rem;
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

  cursor: pointer;
  transition: color var(--transition-200), background var(--transition-200),
    border var(--transition-200);

  color: var(--color-blue-100);
  background-color: var(--color-black-transparent);

  &:hover,
  &:focus-within {
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
  color: var(--color-black);
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  margin-bottom: 2.4rem;
  outline: none;
  transition: border var(--transition-100);

  &:hover,
  &:focus {
    border: 0.2rem solid var(--color-blue-100);
  }

  &::placeholder {
    color: var(--color-grey-300);
  }
`;
const DescriptionInput = styled.textarea`
  width: 100%;
  min-width: 32rem;
  max-width: 38.5rem;

  height: 7rem;
  border: 0.2rem solid var(--color-grey-400);
  background-color: var(--color-grey-700);
  border-radius: 0.8rem;
  padding: 1.05rem 1.2rem;
  color: var(--color-black);
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.9rem;
  letter-spacing: -0.035em;
  outline: none;
  transition: border var(--transition-100);

  &:hover,
  &:focus {
    border: 0.2rem solid var(--color-blue-100);
  }

  &::placeholder {
    color: var(--color-grey-300);
  }

  @media screen and (max-width: 450px) {
    min-width: 100%;
    max-width: 100%;
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

function ProfileOverlay({ onClose, profileData }) {
  const modalRef = useRef();

  // hook for managing the form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: profileData.user_name,
      description: profileData.user_description,
    },
  });

  // custom hook to update user data
  const { updateUser, isPending } = useUpdateUser();

  // custom hook to delete an image
  const { deleteImage } = useDeleteImage();

  function onSubmit(data) {
    // when the user submts (clicks on save)
    // we update the data of the user
    updateUser(
      {
        username: data.username,
        description: data.description,
        avatarImage: data.avatarImage,
        backgroundImage: data.backgroundImage,
      },
      {
        onSuccess: () => {
          // when the updating was successful, we close the modal
          onClose();

          // then check which of the images was updated

          // if only the background image was updated, then delete the previous background image from the storage
          if (data.description.length > 0 && data.avatarImage.length === 0) {
            deleteImage({
              bucketName: 'user_images',
              imageUrl: profileData.background_image,
            });
          }
          // if only the avatar image was updated, then delete the previous avatar image from the storage
          if (data.avatarImage.length > 0 && data.description.length === 0) {
            deleteImage({
              bucketName: 'user_images',
              imageUrl: profileData.avatar_image,
            });
          }

          // if both background and avatar images were changed, then remove the background image first then the avatar image, to avoid any issues they are not removed at the same time
          if (data.avatarImage.length > 0 && data.description.length > 0) {
            deleteImage(
              {
                bucketName: 'user_images',
                imageUrl: profileData.background_image,
              },
              {
                onSettled: () => {
                  deleteImage({
                    bucketName: 'user_images',
                    imageUrl: profileData.avatar_image,
                  });
                },
              }
            );
          }
        },
      }
    );
  }

  // used to prevent the close button from triggering the submit
  // kept as a button for accessibility (to be selectable)
  function handleClose(e) {
    e.preventDefault();
    onClose();
  }

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
      <OutsideClick onClose={onClose} componentRef={modalRef} />
      <StyledProfileOverlay ref={modalRef}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* header containing a close button, a title, and the save button */}
          <Header>
            <CloseButton onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
            <Heading>edit profile</Heading>
            {/* when saving, show a spinner */}
            <SaveButton type="submit">
              {!isPending && <SaveIcon />}
              {isPending && <SmallSpinner />} save
            </SaveButton>
          </Header>

          {/* container for the background image */}
          <BackgroundContainer className="background image">
            {/* if there is no background image show a place holder */}
            {!profileData?.background_image && (
              <BackgroundImagePlaceHolder>No image</BackgroundImagePlaceHolder>
            )}
            {/* if there is a background image then show it */}
            {profileData?.background_image && (
              <BackgroundImage
                src={profileData.background_image}
                alt="background image"
              />
            )}

            {/* file input to change the background image */}
            <ImageLabel htmlFor="profile-background-image-input">
              <AddPhotoIcon />
              <ImageInput
                type="file"
                id="profile-background-image-input"
                {...register('backgroundImage')}
              />
            </ImageLabel>
          </BackgroundContainer>

          <Container className="container">
            {/* container for the avatar image */}
            <AvatarContainer className="avatar container">
              {!profileData.avatar_image && (
                <AvatarPlaceHolder width="12rem" height="12rem" />
              )}
              {profileData.avatar_image && (
                <AvatarImage
                  src={profileData.avatar_image}
                  alt="avatar image"
                />
              )}

              {/* file input to change the avatar image */}
              <ImageLabel htmlFor="profile-avatar-image-input">
                <AddPhotoIcon />
                <ImageInput
                  type="file"
                  id="profile-avatar-image-input"
                  {...register('avatarImage')}
                />
              </ImageLabel>
            </AvatarContainer>

            {/* container for the username and descriptions inputs */}
            <TextInputsContainer>
              <TextLabels>Name:</TextLabels>
              <UserNameInput
                type="text"
                name="username"
                placeholder="Your name"
                {...register('username')}
              />
              <TextLabels>Description:</TextLabels>
              <DescriptionInput
                name="description"
                placeholder="Describe yourself"
                {...register('description')}
              />
            </TextInputsContainer>
          </Container>
        </form>
      </StyledProfileOverlay>
    </Overlay>
  );
}

export default ProfileOverlay;
