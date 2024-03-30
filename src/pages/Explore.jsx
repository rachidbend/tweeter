/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useState } from 'react';

// Importing components and hooks
import SearchFilter from '../features/search/SearchFilter';
import SearchInput from '../features/search/SearchInput';
import SearchResults from '../features/search/SearchResults';
import { useParams } from 'react-router-dom';

// Styled components for layout and styling
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

// Main explore page component that orchestrates the search functionality
function Explore() {
  const { query } = useParams();

  const queried = query?.includes('#') ? query?.replace('%23', '#') : query;
  // State to keep track of the search query and filter
  const [searchQuery, setSearchQuery] = useState(queried || '');
  const [searchFilter, setSearchFilter] = useState('top');

  // State to manage when and if search functions are fetching
  const [executeSearch, setExecuteSearch] = useState(false);

  // State to indicate when search functions are fetching to display a loading indicator
  const [isFetching, setIsFetching] = useState(false);

  // Handler to set the search query based on what the user types
  function handleSearchChange(query) {
    setSearchQuery(query);
  }

  // Handler to initiate fetching
  function handleSearch() {
    setExecuteSearch(true);
  }

  // Handler to change the filter
  function handleFilterChange(filter) {
    setSearchFilter(filter);
  }

  // Effect to initiate fetching when ever the filter changes
  useEffect(
    function () {
      // only start fetching when there is a query to search for
      if (searchQuery !== '') setExecuteSearch(true);
    },
    [searchFilter]
  );

  return (
    <StyledExplore>
      <SearchFilter onFilterChange={handleFilterChange} />
      <Container>
        <SearchInput
          query={queried}
          isFetching={isFetching}
          handleSearch={handleSearch}
          handleSearchChange={handleSearchChange}
        />
        <SearchResults
          searchFilter={searchFilter}
          searchQuery={searchQuery}
          executeSearch={executeSearch}
          onExecuteSearch={setExecuteSearch}
          onIsFetching={setIsFetching}
        />
      </Container>
    </StyledExplore>
  );
}

export default Explore;

// remove_tweet_from_hashtag
