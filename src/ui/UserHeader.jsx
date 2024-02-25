import styled from 'styled-components';
import { TiArrowSortedDown } from 'react-icons/ti';

const StyledUserHeader = styled.div``;

const Avatar = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 0.8rem;
  overflow: hidden;
`;
const Username = styled.p``;
const ArrowDown = styled(TiArrowSortedDown)``;

function UserHeader() {
  return (
    <StyledUserHeader>
      <Avatar src="/images/avatar.jpg" alt="user image" />
      <Username>Xanthe neal</Username>
      <ArrowDown />
    </StyledUserHeader>
  );
}

export default UserHeader;
