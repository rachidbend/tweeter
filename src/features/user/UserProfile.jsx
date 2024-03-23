import { useParams } from 'react-router';
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import { useUser } from '../../hooks/authHooks/useUser';
import UserHeader from '../user/UserHeader';
import TweetView from '../tweetView/TweetView';
import { useEffect, useRef, useState } from 'react';
import TweetsFilter from './TweetsFilter';
import useGetUserTweets from '../../hooks/useGetUserTweets';
import UserTweetsView from './UserTweetsView';

const StyledUserProfile = styled.div`
  width: 100%;
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
  padding: 0 5.4rem;
  max-width: calc(107.3rem + (5.4rem * 2));
  margin: 0 auto;

  @media screen and (max-width: 450px) {
    max-width: 100%;
    padding: 0 1.66rem;
  }
`;

// MainContianer

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
function UserProfile() {
  const [filter, setFilter] = useState('tweets');
  // Get the user ID from the URL parameters
  const { id } = useParams();

  // Fetch the current user and their loading state
  const { user, isLoadingUser } = useUser();

  // Fetch the current user's profile and its loading state
  const { userProfile: currentUser, isLoading: isLoadingCurrentUser } =
    useGetUserData(user.id);

  // Fetch the profile of the user specified in the URL parameters, along with its loading state and any error that occurred
  const { userProfile, isLoading, error } = useGetUserData(id);

  // If any of the data is still loading, display a loading spinner
  if (isLoading || isLoadingUser || isLoadingCurrentUser) return <Spinner />;

  // If there was an error fetching the data, display an error message
  if (error) toast.error(error.message);

  // Extract the necessary data from the userProfile object
  const { background_image } = userProfile;

  return (
    <StyledUserProfile>
      {background_image ? (
        <BackgroundImage src={background_image} />
      ) : (
        <BackgroundImagePlaceHolder></BackgroundImagePlaceHolder>
      )}
      <PageContainer>
        <UserHeader currentUser={currentUser} userProfile={userProfile} />
        <ContentContainer>
          <TweetsFilter handleFilterTweets={setFilter} userId={id} />
          <UserTweetsView filter={filter} id={id} />
        </ContentContainer>
      </PageContainer>
    </StyledUserProfile>
  );
}

export default UserProfile;
