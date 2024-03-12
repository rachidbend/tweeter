import styled from 'styled-components';
import useGetAccountRecommendations from '../hooks/useGetAccountRecommendations';
import Spinner from './Spinner';
import toast from 'react-hot-toast';

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

function WhoToFollow() {
  const { recommendations, isLoading, error } = useGetAccountRecommendations();

  if (isLoading) return <Spinner />;

  if (error) toast.error(error.message);
  console.log(recommendations);
  return (
    <StyledWhoToFollow>
      <Header>
        <Heading>Who to follow</Heading>
      </Header>
    </StyledWhoToFollow>
  );
}

export default WhoToFollow;
