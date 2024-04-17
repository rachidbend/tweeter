/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { AddPhotoIcon, ImageInput, ImageLabel } from '../../ui/ProfileOverlay';

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

function ProfileModalBackgroundImage({ profileData, register }) {
  return (
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
  );
}

export default ProfileModalBackgroundImage;
