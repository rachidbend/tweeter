import styled from 'styled-components';
import { useGetBookmarks } from '../hooks/useGetBokkmarks';
import Spinner from '../ui/Spinner';
import { useState } from 'react';
import { useUser } from '../hooks/authHooks/useUser';
import TweetView from '../features/tweetView/TweetView';
import toast from 'react-hot-toast';
import TweetsFilter from '../features/user/TweetsFilter';

const StyledBookmarks = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 30.4rem 1fr;
  padding: 0 2.4rem;
  justify-content: center;
  align-items: start;
  margin-top: 4.5rem;
  gap: 2.2rem;

  max-width: calc(107.3rem + 2.4rem * 2);

  @media screen and (max-width: 450px) {
    max-width: 100%;
    padding: 0 1.66rem;
    display: grid;
    align-items: start;
    justify-content: start;
    grid-template-columns: 1fr;
    grid-template-rows: min-content;
    margin-top: 1.2rem;
  }
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

function Bookmarks() {
  const { user } = useUser();
  const { savedTweets, isLoading, error } = useGetBookmarks();
  const [filteredTweets, setFilteredTweets] = useState([]);

  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);

  return (
    <StyledBookmarks>
      <TweetsFilter
        tweets={savedTweets[0]}
        handleFilterTweets={setFilteredTweets}
        userId={user.id}
        isBookmark={true}
      />
      <TweetsContainer>
        {filteredTweets?.map(tweet => (
          <TweetView tweet={tweet} key={`bookmarks-${tweet.id}`} />
        ))}
      </TweetsContainer>
    </StyledBookmarks>
  );
}

export default Bookmarks;
