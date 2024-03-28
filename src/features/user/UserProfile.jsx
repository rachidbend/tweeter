import { useParams } from 'react-router';
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import UserHeader from '../user/UserHeader';
import { useState } from 'react';
import TweetsFilter from './TweetsFilter';

import UserTweetsView from './UserTweetsView';
import UserProfileSkeletal from '../../ui/SkeletalUI/userProfile/UserProfileSkeletal';
import UserBackground from './UserBackground';

const StyledUserProfile = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
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

  return (
    <StyledUserProfile>
      <UserBackground userId={id} />
      <PageContainer>
        <UserHeader userId={id} />
        <ContentContainer>
          <TweetsFilter handleFilterTweets={setFilter} userId={id} />
          <UserTweetsView filter={filter} id={id} />
        </ContentContainer>
      </PageContainer>
    </StyledUserProfile>
  );
}

export default UserProfile;
