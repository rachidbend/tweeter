/* eslint-disable react/prop-types */
import styled from 'styled-components';
import TweetsFilter from '../features/user/TweetsFilter';
import UserTweetsView from '../features/user/UserTweetsView';
import { useState } from 'react';

const StyledFilterAndTweetsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(20rem, 30.4rem) minmax(25rem, 1fr);

  justify-content: center;
  align-items: start;

  gap: 2.2rem;

  @media screen and (max-width: 450px) {
    display: grid;
    align-items: start;
    justify-content: start;
    grid-template-columns: 1fr;
    grid-template-rows: min-content;
  }
`;

function FilterAndTweetsContainer({ id, isBookmark = false }) {
  // state to contain the filter to pass it into the UserTweetsView component
  const [filter, setFilter] = useState('tweets');
  return (
    <StyledFilterAndTweetsContainer>
      <TweetsFilter handleFilterTweets={setFilter} isBookmark={isBookmark} />
      <UserTweetsView isBookmark={isBookmark} filter={filter} id={id} />
    </StyledFilterAndTweetsContainer>
  );
}

export default FilterAndTweetsContainer;
