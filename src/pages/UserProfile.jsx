import { useParams } from 'react-router';
import styled from 'styled-components';
import UserHeader from '../features/user/UserHeader';
import UserBackground from '../features/user/UserBackground';
import FilterAndTweetsContainer from '../ui/FilterAndTweetsContainer';

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

// This is the main UserProfile component
function UserProfile() {
  // Get the user ID from the URL parameters
  const { id } = useParams();

  return (
    <StyledUserProfile>
      <UserBackground userId={id} />
      <PageContainer>
        <UserHeader userId={id} />
        <FilterAndTweetsContainer id={id} />
      </PageContainer>
    </StyledUserProfile>
  );
}

export default UserProfile;
