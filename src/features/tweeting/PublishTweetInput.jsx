/* eslint-disable react/prop-types */
import styled from 'styled-components';

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
  return (
    <StyledPublishTweetInput>
      <Input
        type="text"
        placeholder={`What's happening?`}
        {...register('content', { required: true })}
      />
    </StyledPublishTweetInput>
  );
}

export default PublishTweetInput;
