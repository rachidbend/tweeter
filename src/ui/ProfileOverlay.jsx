/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { IconAddImage } from '../styles/Icons';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useUpdateUser from '../hooks/useUpdateUser';
import { useRef } from 'react';
import useDeleteImage from '../hooks/useDeleteImage';
import OutsideClick from '../helpers/OutsideClick';
import ProfileModalHeader from '../features/edit/ProfileModalHeader';
import ProfileModalBackgroundImage from '../features/edit/ProfileModalBackgroundImage';
import ProfileModalAvatarImage from '../features/edit/ProfileModalAvatarImage';
import ProfileModalNameAndDescription from '../features/edit/ProfileModalNameAndDescription';

const Overlay = styled(motion.div)`
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
    border-radius: 0;
  }
`;

// Image input styling

export const ImageLabel = styled.label`
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

export const ImageInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  appearance: hidden;
`;

export const AddPhotoIcon = styled(IconAddImage)`
  height: 2.4rem;
  width: 2.4rem;
  color: inherit;
`;

const Container = styled.div`
  display: flex;
  align-items: start;
  gap: 2.4rem;

  @media screen and (max-width: 450px) {
    flex-direction: column;
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
          <ProfileModalHeader isPending={isPending} onClose={handleClose} />
          {/* container for the background image */}
          <ProfileModalBackgroundImage
            register={register}
            profileData={profileData}
          />

          <Container className="container">
            {/* container for the avatar image */}
            <ProfileModalAvatarImage
              avatarImage={profileData.avatar_image}
              register={register}
            />
            {/* container for the username and descriptions inputs */}
            <ProfileModalNameAndDescription register={register} />
          </Container>
        </form>
      </StyledProfileOverlay>
    </Overlay>
  );
}

export default ProfileOverlay;
