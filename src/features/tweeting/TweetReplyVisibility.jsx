/* eslint-disable react/prop-types */
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import ReplyDropDown from './ReplyDropDown';
import { PiGlobeHemisphereWestFill } from 'react-icons/pi';

const VisibilityButtonContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-grey-400);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  position: relative;
  transition: color var(--transition-200);
  &:hover {
    color: var(--color-blue-100);
  }
`;

const GlobeIcon = styled(PiGlobeHemisphereWestFill)`
  height: 2rem;
  width: 2rem;
  color: inherit;
  cursor: pointer;
  margin-right: 0.55rem;
`;

function TweetReplyVisibility({ replyChoice, onChoiceChange }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleReplyClick() {
    setIsOpen(isOpen => !isOpen);
  }

  function handleChooseReply(choice) {
    onChoiceChange(choice);
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      handleReplyClick();
    }
  }

  return (
    <VisibilityButtonContainer
      tabIndex="0"
      onClick={handleReplyClick}
      onKeyDown={handleKeyDown}
    >
      <GlobeIcon />

      {replyChoice === 'everyone' && 'Everyone can reply'}
      {replyChoice === 'following' && 'People you follow can reply'}
      <AnimatePresence>
        {isOpen && (
          <ReplyDropDown
            onClose={() => setIsOpen(false)}
            onChooseReply={handleChooseReply}
          />
        )}
      </AnimatePresence>
    </VisibilityButtonContainer>
  );
}

export default TweetReplyVisibility;
