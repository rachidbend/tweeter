import styled from 'styled-components';
import { IconUserOutline } from '../styles/Icons';

const StyledAvatarPlaceHolder = styled.div`
  width: ${props => (props.width ? props.width : '4rem')};
  height: ${props => (props.height ? props.height : '4rem')};

  display: flex;
  justify-content: center;
  align-items: center;
`;
const AvatarIcon = styled(IconUserOutline)`
  width: 100%;
  height: auto;
  color: var(--color-grey-300);
  border: 1px solid var(--color-grey-400);
  border-radius: 0.4rem;
  background-color: var(--color-grey-600);
`;

function AvatarPlaceHolder({ width, height, borderRadius }) {
  return (
    <StyledAvatarPlaceHolder width={width} height={height}>
      <AvatarIcon />
    </StyledAvatarPlaceHolder>
  );
}

export default AvatarPlaceHolder;
