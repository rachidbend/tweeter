import styled from 'styled-components';
import AvatarPlaceHolder from './AvatarPlaceHolder';

const StyledWhoToFollowAccount = styled.div``;

const AvatarImage = styled.img``;

function WhoToFollowAccount({ account }) {
  return (
    <StyledWhoToFollowAccount>
      {/* 
        - avater image
        - user name
        - number of followers
        - description
        - background image

        - follow button
      */}

      {account.avatar_image != '' ? <AvatarImage /> : <AvatarPlaceHolder />}
    </StyledWhoToFollowAccount>
  );
}

export default WhoToFollowAccount;
