/* eslint-disable react/prop-types */
import styled from 'styled-components';

const TextLabels = styled.label`
  display: inline-block;
  color: var(--color-grey-200);
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  margin-bottom: 0.6rem;
  padding-left: 0.4rem;
`;

const UserNameInput = styled.input`
  width: 100%;
  display: block;
  border: 0.2rem solid var(--color-grey-500);
  background-color: var(--color-grey-700);
  border-radius: 0.8rem;
  padding: 1.05rem 1.2rem;
  color: var(--color-black);
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.035em;
  margin-bottom: 2.4rem;
  outline: none;
  transition: border var(--transition-100);

  &:hover,
  &:focus {
    border: 0.2rem solid var(--color-blue-100);
  }

  &::placeholder {
    color: var(--color-grey-300);
  }
`;
const DescriptionInput = styled.textarea`
  width: 100%;
  min-width: 32rem;
  max-width: 38.5rem;

  height: 7rem;
  border: 0.2rem solid var(--color-grey-500);
  background-color: var(--color-grey-700);
  border-radius: 0.8rem;
  padding: 1.05rem 1.2rem;
  color: var(--color-black);
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.9rem;
  letter-spacing: -0.035em;
  outline: none;
  transition: border var(--transition-100);

  &:hover,
  &:focus {
    border: 0.2rem solid var(--color-blue-100);
  }

  &::placeholder {
    color: var(--color-grey-300);
  }

  @media screen and (max-width: 450px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

const TextInputsContainer = styled.div`
  width: 100%;
  padding-left: 2.4rem;
  border-left: 0.1rem solid var(--color-grey-500);

  @media screen and (max-width: 450px) {
    padding-left: 0;
    border: none;
  }
`;

function ProfileModalNameAndDescription({ register }) {
  return (
    <TextInputsContainer>
      <TextLabels>Name:</TextLabels>
      <UserNameInput
        type="text"
        name="username"
        placeholder="Your name"
        {...register('username')}
      />
      <TextLabels>Description:</TextLabels>
      <DescriptionInput
        name="description"
        placeholder="Describe yourself"
        {...register('description')}
      />
    </TextInputsContainer>
  );
}

export default ProfileModalNameAndDescription;
