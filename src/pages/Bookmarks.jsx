import styled from 'styled-components';

const StyledBookmarks = styled.div`
  background-color: var(--color-grey-600);
  min-height: 100vh;
  z-index: -1;
`;

function Bookmarks() {
  return <StyledBookmarks>Bookmarks</StyledBookmarks>;
}

export default Bookmarks;
