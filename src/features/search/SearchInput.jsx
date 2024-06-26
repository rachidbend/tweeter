/* eslint-disable react/prop-types */
import styled from 'styled-components';
import SmallSpinner from '../../ui/SmallSpinner';
import { IconSearchOutline } from '../../styles/Icons';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRef, useState } from 'react';

const SearchContainer = styled(motion.div)`
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

const StyledSearchInput = styled.input`
  width: 100%;
  font-family: var(--font-noto);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.179rem;
  letter-spacing: -0.035em;
  color: var(--color-grey-100);
  background-color: var(--color-white);
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

function SearchInput({ isFetching, query }) {
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleClick = () => {
    navigate(`/explore/${inputRef.current.value}`);
  };

  return (
    <SearchContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
    >
      {isFetching ? (
        <SmallSpinner width="2.4rem" height="2.4rem" />
      ) : (
        <SearchIcon />
      )}
      <StyledSearchInput
        ref={inputRef}
        defaultValue={query}
        type="text"
        placeholder="search"
      />
      <SearchButton onClick={handleClick}>Search</SearchButton>
    </SearchContainer>
  );
}

export default SearchInput;
