import styled from 'styled-components';
import { ShimmerEffect } from '../tweet/TweetViewHeaderSkeletal';

const StyledTrendsSkeletal = styled.div`
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

const HeaderText = styled(ShimmerEffect)`
  height: 1.8rem;
  width: 8.2rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding-bottom: 2.8rem;
`;

const TrendContainer = styled.div``;

const Title = styled(ShimmerEffect)`
  height: 2.2rem;
  width: 11.3rem;
  margin-bottom: 0.8rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

const Stat = styled(ShimmerEffect)`
  height: 1.6rem;
  width: 6.7rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

function TrendsSkeletal() {
  return (
    <StyledTrendsSkeletal>
      <Header>
        <HeaderText></HeaderText>
      </Header>
      <Container>
        <TrendContainer>
          <Title></Title>
          <Stat></Stat>
        </TrendContainer>
        <TrendContainer>
          <Title></Title>
          <Stat></Stat>
        </TrendContainer>
        <TrendContainer>
          <Title></Title>
          <Stat></Stat>
        </TrendContainer>
        <TrendContainer>
          <Title></Title>
          <Stat></Stat>
        </TrendContainer>
        <TrendContainer>
          <Title></Title>
          <Stat></Stat>
        </TrendContainer>
        <TrendContainer>
          <Title></Title>
          <Stat></Stat>
        </TrendContainer>
      </Container>
    </StyledTrendsSkeletal>
  );
}

export default TrendsSkeletal;
