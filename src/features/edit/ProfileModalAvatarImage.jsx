/* eslint-disable react/prop-types */
import styled from 'styled-components';
import AvatarPlaceHolder from '../../ui/AvatarPlaceHolder';
import { AddPhotoIcon, ImageInput, ImageLabel } from '../../ui/ProfileOverlay';

const AvatarContainer = styled.div`
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

function ProfileModalAvatarImage({ avatarImage, register }) {
  return (
    <AvatarContainer className="avatar container">
      {!avatarImage && <AvatarPlaceHolder width="12rem" height="12rem" />}
      {avatarImage && <AvatarImage src={avatarImage} alt="avatar image" />}

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
  );
}

export default ProfileModalAvatarImage;
