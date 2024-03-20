import styled from 'styled-components';
import SearchFilter from '../features/search/SearchFilter';
import { IconSearchOutline } from '../styles/Icons';
import { useEffect, useState } from 'react';
import { useSearchTweets } from '../hooks/search/useSearchTweets';
import toast from 'react-hot-toast';
import TweetView from '../features/tweetView/TweetView';
import SmallSpinner from '../ui/SmallSpinner';
import { useSearchAccounts } from '../hooks/search/useSearchAccounts';
import UserView from '../ui/UserView';
import { useSearchMedia } from '../hooks/search/useSearchMedia';

const StyledExplore = styled.div`
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 30.4rem 1fr;

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

const Container = styled.div``;

// search bar
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  box-shadow: var(--shadow-100);

  padding: 1.1rem 1.2rem 1.1rem 1rem;
  border-radius: 0.8rem;
  margin-bottom: 1.65rem;
`;
const SearchInput = styled.input`
  font-family: var(--font-noto);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.179rem;
  letter-spacing: -0.035em;
  color: var(--color-grey-100);
  outline: none;
  padding: 0.36rem 1.8rem;
  padding-left: 1.2rem;
  border-radius: 0.4rem;
  border: 0.1rem solid transparent;
  flex-grow: 1;
  margin-right: 1.2rem;
  margin-left: 0.6rem;
  &::placeholder {
    color: var(--color-grey-400);
  }

  &:focus {
    border: 0.1rem solid var(--color-grey-500);
  }
`;
const SearchIcon = styled(IconSearchOutline)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-grey-400);
`;
const SearchButton = styled.button`
  margin-left: auto;

  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;

  padding: 0.6rem 2.2rem;
  border: 0.2rem solid var(--color-blue-100);
  border-radius: 0.4rem;
  background-color: var(--color-blue-100);
  color: var(--color-white);
  cursor: pointer;

  &:hover,
  &:focus {
    color: var(--color-blue-100);
    background-color: var(--color-white);
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 3.525rem;
`;

function Explore() {
  // state to get the value of the search input
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('top');

  // custom hook to get the search data
  const {
    searchTweets,
    isPending: isSearchingTweets,
    error: tweetsError,
    data: tweetsData,
  } = useSearchTweets();
  const {
    searchAccounts,
    isPending: isSearchingAccounts,
    error: accountsError,
    data: accountsData,
  } = useSearchAccounts();

  const {
    searchMedia,
    isPending: isSearchingMedia,
    error: mediaError,
    data: mediaData,
  } = useSearchMedia();

  // handler for search query change
  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  // handler to call the search function
  function handleSearch() {
    if (searchTweets === '') return;
    if (searchFilter === 'top' || searchFilter === 'latest')
      searchTweets({ searchQuery: searchQuery, filter: searchFilter });

    if (searchFilter === 'people') searchAccounts({ searchQuery: searchQuery });

    if (searchFilter === 'media') searchMedia({ searchQuery: searchQuery });
  }

  function handleFilterChange(filter) {
    // there are 4 filters, 'top', 'recent', 'people', and 'media'
    // the first two (top and recent) are handeled bu the same function
    setSearchFilter(filter);
  }

  useEffect(
    function () {
      if (searchTweets === '') return;
      if (searchFilter === 'top' || searchFilter === 'latest')
        searchTweets({ searchQuery: searchQuery, filter: searchFilter });

      if (searchFilter === 'people')
        searchAccounts({ searchQuery: searchQuery });

      if (searchFilter === 'media') searchMedia({ searchQuery: searchQuery });
    },
    [searchFilter, searchTweets]
  );

  // if (!isSearchingTweets && tweetsData !== undefined) console.log(tweetsData);
  if (!isSearchingMedia && mediaData !== undefined) console.log(mediaData);
  if (tweetsError) toast.error(tweetsError.message);
  if (accountsError) toast.error(accountsError.message);
  if (mediaError) toast.error(mediaError.message);

  return (
    <StyledExplore>
      <SearchFilter onFilterChange={handleFilterChange} />
      <Container>
        <SearchContainer>
          {isSearchingTweets || isSearchingAccounts || isSearchingMedia ? (
            <SmallSpinner width="2.4rem" height="2.4rem" />
          ) : (
            <SearchIcon />
          )}
          <SearchInput
            type="text"
            placeholder="search"
            onChange={handleSearchChange}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchContainer>
        <ResultsContainer>
          {/* if the filter is set to top or latest, show the resulting tweets */}
          {(searchFilter === 'top' || searchFilter === 'latest') &&
            tweetsData?.map(tweet => (
              <TweetView tweet={tweet} key={`tweet-search-${tweet.id}`} />
            ))}

          {searchFilter === 'people' &&
            accountsData?.map(account => (
              <UserView
                userId={account.id}
                key={`user-search-account-${account.id}`}
              />
            ))}

          {searchFilter === 'media' &&
            mediaData?.map(tweet => (
              <TweetView
                tweet={tweet}
                key={`user-search-account-${tweet.id}`}
              />
            ))}
        </ResultsContainer>
      </Container>
    </StyledExplore>
  );
}

export default Explore;

/*

-- check which users have a match in the username or bio, if the query is present in either the bio or username, the user is added to a list of other matching users

-- the matched users are orders by the number of followers they have


SELECT profiles.id, profiles.username, profiles.description
FROM profiles
WHERE to_tsvector('english', profiles.username) @@ plainto_tsquery('english', 'search query')
OR to_tsvector('english', profiles.description) @@ plainto_tsquery('english', 'search query');

*/
