import styled from 'styled-components';
import { useState } from 'react';
import { useUser } from '../hooks/authHooks/useUser';
import TweetsFilter from '../features/user/TweetsFilter';
import UserTweetsView from '../features/user/UserTweetsView';

const StyledBookmarks = styled.div`
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: minmax(20rem, 30.4rem) minmax(25rem, 1fr);

  justify-content: center;
  align-items: start;
  margin-top: 4.5rem;
  gap: 2.2rem;

  width: min(var(--content-max-width), 100% - var(--page-padding-large) * 2);
  margin-inline: auto;

  @media screen and (max-width: 450px) {
    width: min(100% - var(--page-padding-small) * 2);

    display: grid;
    align-items: start;
    justify-content: start;
    grid-template-columns: 1fr;
    grid-template-rows: min-content;
    margin-top: 1.2rem;
  }
`;

function Bookmarks() {
  // get the id of the user
  const { user } = useUser();
  // state to contain the filter to pass it into the UserTweetsView component
  const [filter, setFilter] = useState('tweets');
  return (
    <StyledBookmarks>
      <TweetsFilter handleFilterTweets={setFilter} isBookmark={true} />
      <UserTweetsView isBookmark={true} filter={filter} id={user.id} />
    </StyledBookmarks>
  );
}

export default Bookmarks;
