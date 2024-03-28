import { TiArrowSortedDown } from 'react-icons/ti';
import styled from 'styled-components';
import { ShimmerEffect } from '../tweet/TweetViewHeaderSkeletal';

const StyledUserHeaderSkeletal = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.4rem;
  background-color: transparent;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
`;

const Avatar = styled(ShimmerEffect)`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 0.8rem;

  background-color: var(--color-grey-600);

  @media screen and (max-width: 450px) {
    margin-right: 0;
  }
`;

const Username = styled(ShimmerEffect)`
  margin-right: 1.94rem;
  margin-left: 1.1rem;
  width: 7.6rem;
  height: 1.4rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const ArrowDown = styled(TiArrowSortedDown)`
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

function UserHeaderSkeletal() {
  return (
    <StyledUserHeaderSkeletal>
      <Avatar />
      <Username />
      <ArrowDown />
    </StyledUserHeaderSkeletal>
  );
}

export default UserHeaderSkeletal;
