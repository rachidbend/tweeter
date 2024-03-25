/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import TweetView from '../tweetView/TweetView';
import { useEffect, useRef, useState } from 'react';
import Spinner from '../../ui/Spinner';
import UserView from '../../ui/UserView';
import { useSearchTweets } from '../../hooks/search/useSearchTweets';
import { useSearchAccounts } from '../../hooks/search/useSearchAccounts';
import toast from 'react-hot-toast';

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

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SearchResults({
  searchQuery,
  searchFilter,
  executeSearch,
  onExecuteSearch,
  onIsFetching,
}) {
  const [observer, setObserver] = useState(null);
  const sentinalRef = useRef();

  // custom hook to get the search the most popular or most recent tweets, and return all tweet ot only the tweets that include media in them
  const {
    tweetsData,
    isLoading: isSearchingTweets,
    error: tweetsError,
    fetchNextPage: fetchNextTweetsPage,
  } = useSearchTweets({ executeSearch, filter: searchFilter, searchQuery });

  // custom hook to search for poeple that have the query in their username or description, ordered by users with the most followers to the least
  const {
    accountsData,
    isLoading: isSearchingAccounts,
    error: accountsError,
    fetchNextPage: fetchNextAccountsPage,
  } = useSearchAccounts({ executeSearch, filter: searchFilter, searchQuery });

  // Effect to stop executing the fetch functions once some data has returned
  useEffect(
    function () {
      if (executeSearch) {
        onExecuteSearch(false);
      }
    },
    [tweetsData, accountsData]
  );

  // Effect to initialise and controll the intersecton observer api so that it would work proprly
  useEffect(
    function () {
      // initianising the observer
      const initailizeObserver = () => {
        // creating an intersection observer
        const newObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            // if a function is fetching data, do nothing
            if (isSearchingTweets || isSearchingAccounts) return;
            // if there is no fetching happening, AND the Sentinal element is intersecting (visible), fetch the next appropriate page depending on the filter
            if (entry.isIntersecting) {
              if (
                searchFilter === 'top' ||
                searchFilter === 'latest' ||
                searchFilter === 'media'
              ) {
                fetchNextTweetsPage();
              }

              if (searchFilter === 'people') {
                fetchNextAccountsPage();
              }
            }
          });
        });

        // make sure the sentinal element is mounted first, then observe it
        if (sentinalRef.current) {
          newObserver.observe(sentinalRef.current);
        }

        // if there already is an observer, disconnect it
        if (observer) {
          newObserver.disconnect;
        }

        // set the observer state to the new observer, to keep track of the observer and make sure there only is one, and is used even after a filter change
        setObserver(newObserver);
      };

      initailizeObserver();

      // if there is an observer, disconnect it when this component unmounts
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
      // the dependency array can not include the observer state, or it will cause infinite loop
    },
    [searchFilter, sentinalRef.current, isSearchingTweets, isSearchingAccounts]
  );

  // Effect to tell the parent that it is fetching data or not fetching data
  useEffect(
    function () {
      if (isSearchingAccounts || isSearchingTweets) {
        onIsFetching(true);
      } else {
        onIsFetching(false);
      }
    },
    [isSearchingAccounts, isSearchingTweets, onIsFetching]
  );

  // error notifications
  if (tweetsError) toast.error(tweetsError.message);
  if (accountsError) toast.error(accountsError.message);

  return (
    <ResultsContainer>
      {/* if the filter is set to top, latest or media, show the resulting tweets */}
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
        accountsData?.pages.map(page => {
          return page === null
            ? ''
            : page.map(account => (
                <UserView
                  variant="searchPage"
                  userId={account.id}
                  key={`user-search-account-${account.id}`}
                />
              ));
        })}
      {(isSearchingTweets || isSearchingAccounts) && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      {/* Sentinal component  */}
      <Sentinal ref={sentinalRef}></Sentinal>
    </ResultsContainer>
  );
}

export default SearchResults;
