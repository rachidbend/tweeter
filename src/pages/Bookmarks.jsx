import styled from 'styled-components';
import { useUser } from '../hooks/authHooks/useUser';
import FilterAndTweetsContainer from '../ui/FilterAndTweetsContainer';

const StyledBookmarks = styled.div`
  min-height: 100vh;
  margin-top: 4.5rem;
  width: min(var(--content-max-width), 100% - var(--page-padding-large) * 2);
  margin-inline: auto;

  @media screen and (max-width: 450px) {
    width: min(100% - var(--page-padding-small) * 2);
    margin-top: 1.2rem;
  }
`;

function Bookmarks() {
  // get the id of the user
  const { user } = useUser();

  return (
    <StyledBookmarks>
      <FilterAndTweetsContainer id={user.id} isBookmark={true} />
    </StyledBookmarks>
  );
}

export default Bookmarks;
