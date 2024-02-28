/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FaUserGroup } from 'react-icons/fa6';
import { PiGlobeHemisphereWestFill } from 'react-icons/pi';
import styled from 'styled-components';

const StyledReplyDropDown = styled(motion.div)`
  border: 1px solid var(--color-grey-500);
  background-color: var(--color-white);
  border-radius: 1.2rem;
  padding: 0.914rem 1.2rem;
  position: absolute;
  left: 0;
  top: 4.6rem;
`;

const VisibilityHeading = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-200);
  letter-spacing: -0.035em;
  margin-bottom: 0.13rem;
`;
const VisibilityText = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-grey-300);
  letter-spacing: -0.035em;
  margin-bottom: 1.518rem;
`;

const VisibilityChoice = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-200);
  padding: 0.981rem 1.168rem 0.634rem 1.168rem;
  letter-spacing: -0.035em;
  width: 20.994rem;
  cursor: pointer;
  border-radius: 0.8rem;
  margin-bottom: 0.479rem;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  transition: var(--transition-200);
  &:hover {
    background-color: var(--color-grey-600);
  }
`;

const VisibilityGlobeIcon = styled(PiGlobeHemisphereWestFill)`
  height: 2rem;
  width: 2rem;
  color: inherit;
  cursor: pointer;
  margin-right: 0.55rem;
  transition: color var(--transition-200);
`;
const VisibilityPeopleIcon = styled(FaUserGroup)`
  height: 2rem;
  width: 2rem;
  color: inherit;
  cursor: pointer;
  margin-right: 0.55rem;
  transition: color var(--transition-200);
`;

function ReplyDropDown({ onChooseReply }) {
  return (
    <StyledReplyDropDown
      initial={{
        opacity: 0,
        y: -15,
      }}
      animate={{
        opacity: 1,
        y: 1,
      }}
      exit={{
        opacity: 0,
        y: -15,
        transition: {
          type: 'tween',
          duration: 0.2,
        },
      }}
    >
      <VisibilityHeading>Who can reply?</VisibilityHeading>
      <VisibilityText>choose who can reply to this Tweet.</VisibilityText>
      <VisibilityChoice onClick={() => onChooseReply('everyone')}>
        <VisibilityGlobeIcon /> Everyone
      </VisibilityChoice>
      <VisibilityChoice onClick={() => onChooseReply('following')}>
        <VisibilityPeopleIcon /> People you follow
      </VisibilityChoice>
    </StyledReplyDropDown>
  );
}

export default ReplyDropDown;
