import styled from 'styled-components';
import useGetAccountRecommendations from '../hooks/useGetAccountRecommendations';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import { useUser } from '../hooks/authHooks/useUser';
import UserView from './UserView';

const StyledWhoToFollow = styled.div`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-100);
`;

const Header = styled.div`
  border-bottom: 0.1rem solid var(--color-grey-500);
  padding-bottom: 0.8rem;
  margin-bottom: 2.4rem;
`;

const Heading = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: var(--color-grey-200);
`;

const Container = styled.div``;

function WhoToFollow() {
  const { user } = useUser();
  const { recommendations, isLoading, error } = useGetAccountRecommendations();
  let filteredRecommendations;

  if (isLoading) return <Spinner />;

  if (error) toast.error(error.message);

  // if the id of the current user is contained in the recommendations
  const currentUserIsIncluded = recommendations.some(id => id === user.id);
  // we remove it, then there are only two recommendations
  if (currentUserIsIncluded)
    filteredRecommendations = recommendations.filter(id => id !== user.id);
  // if id of the current user is not contained in the recommendations, we remove one of the recommendations
  if (!currentUserIsIncluded)
    filteredRecommendations = recommendations.slice(1);

  return (
    <StyledWhoToFollow>
      <Header>
        <Heading>Who to follow</Heading>
      </Header>

      <Container>
        {filteredRecommendations?.map(userId => (
          <UserView userId={userId} key={`user_to_follow_id_${userId}`} />
        ))}
      </Container>
    </StyledWhoToFollow>
  );
}

export default WhoToFollow;
