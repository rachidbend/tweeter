import { useState } from 'react';
import styled from 'styled-components';
import { useGetUserData } from '../hooks/user/useGetUserData';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';
import UserHeader from '../features/user/UserHeader';
import TweetsFilter from '../features/user/TweetsFilter';
import TweetView from '../features/tweetView/TweetView';
import { useUser } from '../hooks/authHooks/useUser';
import ProfileOverlay from '../ui/ProfileOverlay';
import ModalWrapper from '../ui/ModalWrapper';
import UserTweetsView from '../features/user/UserTweetsView';
import UserProfileSkeletal from '../ui/SkeletalUI/userProfile/UserProfileSkeletal';

const StyledUserProfile = styled.div`
  min-height: 100vh;
  min-height: 100svh;
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

const PageContainer = styled.div`
  width: min(var(--content-max-width), 100% - var(--page-padding-large) * 2);
  margin-inline: auto;

  @media screen and (max-width: 450px) {
    max-width: 100%;
    width: min(100% - var(--page-padding-small) * 2);
  }
`;

// MainContainer

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 30.4rem 1fr;
  gap: 2.4rem;
  align-items: start;

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

// This is the main UserProfile component
function Profile() {
  // this is the state that allows the filter component to work properly
  const [filter, setFilter] = useState('tweets');
  // state to controll if the overlay is visible or hidden
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Fetch the current user and their loading state
  const { user, isLoadingUser } = useUser();

  // Fetch the current user's profile and its loading state
  const {
    userProfile: currentUser,
    isLoading: isLoadingCurrentUser,
    error,
  } = useGetUserData(user.id);

  // handle open overlay
  function handleModalClose() {
    setIsOverlayOpen(false);
  }

  function handleModalOpen() {
    setIsOverlayOpen(true);
  }

  // If any of the data is still loading, display a loading spinner
  if (isLoadingUser || isLoadingCurrentUser) return <UserProfileSkeletal />;

  // If there was an error fetching the data, display an error message
  if (error) toast.error(error.message);

  // Extract the necessary data from the userProfile object
  const { background_image } = currentUser;

  return (
    <StyledUserProfile>
      {background_image ? (
        <BackgroundImage src={background_image} />
      ) : (
        <BackgroundImagePlaceHolder></BackgroundImagePlaceHolder>
      )}
      <PageContainer>
        <UserHeader
          userId={user.id}
          isProfile={true}
          handleEdit={handleModalOpen}
        />
        <ContentContainer>
          <TweetsFilter handleFilterTweets={setFilter} userId={user.id} />
          <UserTweetsView filter={filter} id={user.id} />
        </ContentContainer>
      </PageContainer>

      {/* using ModalWrapper to allow for exit animation using 'AnimatePresence' */}
      <ModalWrapper isShowing={isOverlayOpen}>
        <ProfileOverlay profileData={currentUser} onClose={handleModalClose} />
      </ModalWrapper>
    </StyledUserProfile>
  );
}

export default Profile;
