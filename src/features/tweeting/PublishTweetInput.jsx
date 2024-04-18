/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import toast from 'react-hot-toast';
import useMatchHashtag from '../../hooks/hashtags/useMatchHashtag';
import Spinner from '../../ui/Spinner';
import SmallSpinner from '../../ui/SmallSpinner';

const StyledPublishTweetInput = styled.div`
  position: relative;
`;
const Input = styled.textarea`
  width: 100%;
  resize: none;
  min-height: 6rem;
  font-family: var(--font-noto);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  letter-spacing: -0.035em;
  color: var(--color-grey-100);
  background: none;
  border: none;
  outline: none;
  margin-top: 0.9rem;

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const Container = styled.div`
  position: absolute;
  /* height: 5rem; */
  display: flex;

  flex-direction: column;
  gap: 0.4rem;
  top: 7rem;
  min-width: 100%;
  max-width: 100vw;
  background-color: var(--color-white);
  border: 0.1rem solid var(--color-grey-500);
  border-radius: 1.2rem;
  padding: 1.2rem 1.2rem;

  z-index: 999;
`;

const Suggestion = styled.p`
  font-family: var(--font-poppings);
  font-size: 1.4rem;
  color: var(--color-grey-100);
  font-weight: 500;
  cursor: pointer;
`;

function PublishTweetInput({ register, content, setContent }) {
  const [hashtags, setHashtags] = useState([]);

  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const { matchingHashtags, isLoading, error } = useMatchHashtag(
    hashtags[hashtags.length - 1]?.split('#')[1] || ''
  );
  function handleChange(e) {
    const value = e.target.value;
    setContent(value);
  }

  function handleSeggestionClick(value) {
    const lastHashtag = hashtags[hashtags.length - 1];
    const newContent = content.replace(lastHashtag, value);
    setContent(newContent);
    inputRef.current.focus();
  }

  const inputRef = useRef(null);

  useEffect(() => {
    const hashtagRegex = /#[\w]+/g;
    const hashtagsArray = content.match(hashtagRegex) || [];
    setHashtags(hashtagsArray);
  }, [content]);

  // used to show hashtag suggestions for the last word that is a hashtag
  useEffect(() => {
    const allContentWords = content.split(' ');
    const isContained = allContentWords[allContentWords.length - 1]?.includes(
      hashtags[hashtags.length - 1]
    );

    if (isContained) {
      setIsSuggestionsOpen(true);
    } else {
      setIsSuggestionsOpen(false);
    }
  }, [content, hashtags]);

  // used to get the ref of the input while using react hook form
  const { ref, ...rest } = register('content', {
    required: true,
    onChange: handleChange,
  });

  if (isLoading) return <SmallSpinner />;
  if (error) toast.error(error.message);

  return (
    <StyledPublishTweetInput>
      <Input
        ref={e => {
          ref(e);
          inputRef.current = e;
        }}
        type="text"
        value={content}
        placeholder={`What's happening?`}
        {...rest}
      />
      {hashtags.length > 0 && isSuggestionsOpen && (
        <Container>
          {isSuggestionsOpen &&
            matchingHashtags?.map(hashtag => (
              <Suggestion
                onClick={() => handleSeggestionClick(hashtag.name)}
                key={hashtag.name}
              >
                {hashtag.name}
              </Suggestion>
            ))}
        </Container>
      )}
    </StyledPublishTweetInput>
  );
}

export default PublishTweetInput;

// this is awsome, #fun, this should be so cool #100DaysOfCode
