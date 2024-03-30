/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import useCreateHashtag from '../../hooks/hashtags/useCreateHashtag';
import toast from 'react-hot-toast';

const StyledPublishTweetInput = styled.div``;
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

function PublishTweetInput({ register }) {
  const [content, setContent] = useState('');

  // function handleChange(e) {
  //   const value = e.target.value;

  //   const includesHash = value.includes('#');

  //   setContent(value);

  //   if (includesHash) {
  //     const wordsArray = value.split(' ');
  //     const indexArray = [];
  //     const hashtagsArray = [];
  //     console.log(wordsArray);
  //     wordsArray.forEach((word, index) => {
  //       if (word.includes('#')) {
  //         indexArray.push(index);
  //         hashtagsArray.push(word);
  //       }
  //     });
  //     console.log(hashtagsArray);
  //   }
  // }

  // function handleChange(e) {
  //   const value = e.target.value;
  //   setContent(value);

  //   // Regular expression to match hashtags: starts with # followed by one or more word characters (alphanumeric and underscore)
  //   const hashtagRegex = /#[\w]+/g;
  //   const hashtagsArray = value.match(hashtagRegex) || [];

  //   console.log('Extracted Hashtags:', hashtagsArray);
  // }

  // onChange: handleChange
  return (
    <StyledPublishTweetInput>
      <Input
        type="text"
        // value={content}
        placeholder={`What's happening?`}
        {...register('content', { required: true })}
      />
    </StyledPublishTweetInput>
  );
}

export default PublishTweetInput;

// this is awsome, #fun, this should be so cool #100DaysOfCode
