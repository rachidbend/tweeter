import styled from 'styled-components';
import SearchFilter from '../features/search/SearchFilter';
import { IconSearchOutline } from '../styles/Icons';
import { useEffect, useRef, useState } from 'react';
import { useSearchTweets } from '../hooks/search/useSearchTweets';
import toast from 'react-hot-toast';
import TweetView from '../features/tweetView/TweetView';
import SmallSpinner from '../ui/SmallSpinner';
import { useSearchAccounts } from '../hooks/search/useSearchAccounts';
import UserView from '../ui/UserView';

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

  &:focus-within {
    outline: 2px solid var(--color-grey-300);
  }
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

  /* &:focus {
    border: 0.1rem solid var(--color-grey-500);
  } */
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

const Sentinal = styled.div`
  background: none;
  height: 0;
  visibility: hidden;
`;
function Explore() {
  // state to get the value of the search input
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('top');
  const [observer, setObserver] = useState(null);
  // the search custom hooks will only run when the executeSearch is set to true, and they will run depenign on the filter, so that only the appropriate data will be returned based on the filter
  const [executeSearch, setExecuteSearch] = useState(false);

  const sentinalRef = useRef();
  // custom hook to get the search the most popular or most recent tweets
  const {
    tweetsData,
    isLoading: isSearchingTweets,
    error: tweetsError,
    fetchNextPage,
  } = useSearchTweets({ executeSearch, filter: searchFilter, searchQuery });

  // custom hook to search for poeple that have the query in their username or description, ordered by users with the most followers to the least
  const {
    accountsData,
    isLoading: isSearchingAccounts,
    error: accountsError,
  } = useSearchAccounts({ executeSearch, filter: searchFilter, searchQuery });

  // same as search for most popular tweets that match the query but only returns tweets that include an image (or media)

  // handler for search query change
  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  // handler to trigger the functions to search when the user click 'search' button
  function handleSearch() {
    setExecuteSearch(true);
  }

  // change the filter when ever the user changes the filter
  function handleFilterChange(filter) {
    setSearchFilter(filter);
  }

  // when ever the search filter changes, search for the query
  useEffect(
    function () {
      if (searchQuery !== '') setExecuteSearch(true);
    },
    [searchFilter]
  );

  // once the data is returned, stop the execute of all queries
  useEffect(
    function () {
      if (executeSearch) {
        setExecuteSearch(false);
      }
    },
    [tweetsData, accountsData]
  );

  useEffect(
    function () {
      const initailizeObserver = () => {
        const newObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (isSearchingTweets) return;
            if (entry.isIntersecting) {
              fetchNextPage();
            }
          });
        });

        if (sentinalRef.current) {
          newObserver.observe(sentinalRef.current);
        }

        if (observer) {
          newObserver.disconnect;
        }

        setObserver(newObserver);
      };

      initailizeObserver();

      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    },
    [searchFilter, sentinalRef.current]
  );

  if (tweetsError) toast.error(tweetsError.message);
  if (accountsError) toast.error(accountsError.message);

  return (
    <StyledExplore>
      <SearchFilter onFilterChange={handleFilterChange} />
      <Container>
        <SearchContainer>
          {isSearchingTweets || isSearchingAccounts ? (
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
          {(searchFilter === 'top' ||
            searchFilter === 'latest' ||
            searchFilter === 'media') &&
            tweetsData?.pages.map(page => {
              return page === null
                ? ''
                : page.map(tweet => (
                    <TweetView tweet={tweet} key={`tweet-search-${tweet.id}`} />
                  ));
            })}

          {/* if the filter is set to people, show account that include the query in their username or description */}
          {searchFilter === 'people' &&
            accountsData?.map(account => (
              <UserView
                variant="searchPage"
                userId={account.id}
                key={`user-search-account-${account.id}`}
              />
            ))}
          <Sentinal ref={sentinalRef}></Sentinal>
        </ResultsContainer>
      </Container>
    </StyledExplore>
  );
}

export default Explore;
