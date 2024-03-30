/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TextContent = styled.p`
  font-family: var(--font-noto);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
  letter-spacing: -0.035em;
  margin-bottom: 2rem;
  color: var(--color-grey-200);
  margin-top: 1.5rem;
`;

const Hashtag = styled(Link)`
  font-weight: 600;
  color: var(--color-blue-100);
  text-decoration: none;
`;

function TweetContent({ tweet }) {
  const hashtagRegex = /#[\w]+/g;
  const tweetContent = tweet?.content.split(' ');
  return (
    <TextContent>
      {/* check if there are any hashtags, if there are, render them inside a button */}
      {tweetContent.map(word => {
        const hashtagsArray = word.match(hashtagRegex) || [];
        if (hashtagsArray.length === 0) return ` ${word}`;
        if (hashtagsArray.length !== 0)
          return (
            <React.Fragment key={`hashtag-${tweet.id}-${word}-text-content`}>
              <span key={`hashtag-${tweet.id}-${word}-space`}> </span>
              <Hashtag
                key={`hashtag-${tweet.id}-${word}`}
                to={`/explore/${word.replace('#', '%23')}`}
              >
                {word}
              </Hashtag>
            </React.Fragment>
          );
      })}
    </TextContent>
  );
}

export default TweetContent;
