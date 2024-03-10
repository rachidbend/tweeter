/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useGetUserData } from '../../hooks/user/useGetUserData';
import { Link } from 'react-router-dom';

const StyledTweetReply = styled.div``;

const ReplyingTo = styled.p`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--color-grey-300);
  margin-left: 6rem;
  margin-bottom: 1.2rem;
`;
const ReplyingToUserName = styled(Link)`
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: var(--color-grey-100);
  margin-left: 0.6rem;
`;
function TweetReply({ originalTweeterId }) {
  const { userProfile: originalTweeter } = useGetUserData(originalTweeterId);
  return (
    <StyledTweetReply>
      <ReplyingTo>
        replying to:
        <ReplyingToUserName to={`/user/${originalTweeter?.id}`}>
          {originalTweeter?.user_name}
        </ReplyingToUserName>
      </ReplyingTo>
    </StyledTweetReply>
  );
}

export default TweetReply;
