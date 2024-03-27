import styled from 'styled-components';
import { ShimmerEffect } from './TweetViewHeaderSkeletal';

const StyledTweetsFilter = styled.div`
  position: relative;
  background-color: var(--color-white);
  border-radius: 0.8rem;
  box-shadow: var(--shadow-100);
  width: 100%;
  padding: 2.6rem 2rem 3.1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.9rem;
`;

const Filter = styled(ShimmerEffect)`
  height: 1.6rem;
  width: 10rem;
  background-color: var(--color-grey-600);
  border-radius: 0.4rem;
`;

function TweetFilterSkeletal() {
  return (
    <StyledTweetsFilter>
      <Filter></Filter>
      <Filter></Filter>
      <Filter></Filter>
      <Filter></Filter>
    </StyledTweetsFilter>
  );
}

export default TweetFilterSkeletal;
