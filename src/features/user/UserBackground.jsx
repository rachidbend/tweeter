/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import { ShimmerEffect } from '../../ui/SkeletalUI/tweet/TweetViewHeaderSkeletal';
import toast from 'react-hot-toast';

const StyledUserBackground = styled.div`
  height: 29.751rem;
  background-color: var(--color-grey-500);
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 29.751rem;
  object-fit: cover;
  object-position: center;
`;
const BackgroundImagePlaceHolder = styled.div`
  width: 100%;
  height: 29.751rem;
  background-color: var(--color-grey-400);
`;

const BackgroundImageSkeletal = styled(ShimmerEffect)`
  height: 29.751rem;
  background-color: var(--color-grey-400);
`;

function UserBackground({ userId }) {
  const { userProfile, isLoading, error } = useGetUserData(userId);

  if (isLoading) return <BackgroundImageSkeletal />;

  if (error) toast.error(error.message);

  const { background_image } = userProfile;

  return (
    <StyledUserBackground>
      {background_image ? (
        <BackgroundImage src={background_image} />
      ) : (
        <BackgroundImagePlaceHolder />
      )}
    </StyledUserBackground>
  );
}

export default UserBackground;
