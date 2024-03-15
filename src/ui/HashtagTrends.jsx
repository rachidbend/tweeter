import styled from 'styled-components';
import useGetTrendyHashtags from '../hooks/hashtags/useGetTrendyHashtags';
import Spinner from './Spinner';
import { formatNumber } from '../helpers/functions';

const StyledHashtagTrends = styled.div`
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding-bottom: 2.8rem;
`;

const TrendContainer = styled.div``;

const Title = styled.p`
  font-family: var(--font-noto);
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: var(--color-grey-100);
  margin-bottom: 0.8rem;
`;

const Stat = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-grey-300);
`;

function HashtagTrends() {
  const { trends, isLoading, error } = useGetTrendyHashtags();

  if (isLoading) return <Spinner />;

  return (
    <StyledHashtagTrends>
      <Header>
        <Heading>Trends for you</Heading>
      </Header>
      <Container>
        {trends.map(trend => (
          <TrendContainer key={`trend-${trend.id}`}>
            <Title>#{trend.name}</Title>
            <Stat>{formatNumber(trend.number_of_tweets)} Tweets</Stat>
          </TrendContainer>
        ))}
      </Container>
    </StyledHashtagTrends>
  );
}

export default HashtagTrends;
