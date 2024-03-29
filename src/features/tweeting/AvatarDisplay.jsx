import styled from 'styled-components';
import AvatarPlaceHolder from '../../ui/AvatarPlaceHolder';

const Avatar = styled.img`
  height: 4rem;
  width: 4rem;
  object-fit: cover;
  object-position: center;
  border-radius: 0.8rem;
`;
function AvatarDisplay({ avatarImage }) {
  if (!avatarImage) return <AvatarPlaceHolder />;

  if (avatarImage) return <Avatar src={avatarImage} />;
}

export default AvatarDisplay;
