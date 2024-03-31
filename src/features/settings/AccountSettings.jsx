import styled from 'styled-components';
import { SaveButton, SaveIcon } from '../../pages/Settings';
import SmallSpinner from '../../ui/SmallSpinner';
import useChangePassword from './../../hooks/authHooks/useChangePassword';
import useChangeEmail from './../../hooks/authHooks/useChangeEmail';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/authHooks/useUser';
import Spinner from '../../ui/Spinner';
import { EyeOffIcon, EyeOnIcon } from '../auth/AuthStyles';
import { IconTrashOutline } from '../../styles/Icons';

const StyledAccountSettings = styled.div``;

// changing password
const Input = styled.input`
  min-width: 26rem;
  max-width: 100%;
  font-family: var(--font-noto);
  font-size: 1.4rem;
  color: var(--color-grey-100);
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid var(--color-grey-500);
  background-color: var(--color-grey-700);
  /* width: 100%; */
  padding-right: 3.6rem;

  @media screen and (max-width: 450px) {
    min-width: 0rem;
    width: 100%;

    &.email-input {
      margin-bottom: 2.6rem;
    }
  }
`;

const Label = styled.label`
  display: block;
  font-family: var(--font-noto);
  font-size: 1.4rem;
  color: var(--color-grey-100);
  margin-bottom: 0.6rem;
  margin-left: 0.2rem;
`;

const Wrapper = styled.div`
  margin-bottom: 2.6rem;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 4.8rem;
  row-gap: 2.4rem;
  justify-content: start;
  align-items: center;

  @media screen and (max-width: 450px) {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4.6rem;

  @media screen and (max-width: 450px) {
    margin-bottom: 2.8rem;
    margin-top: 1.4rem;
  }
`;
const Title = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  text-transform: capitalize;
  color: var(--color-grey-200);

  @media screen and (max-width: 450px) {
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: min-content;

  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

const DeleteAccountButton = styled.button`
  border: 0.2rem solid var(--color-red-100);
  padding: 0.38rem 1.3rem 0.52rem 1.2rem;
  font-family: var(--font-poppings);
  font-size: 1.2rem;
  letter-spacing: -0.035em;
  font-weight: 500;
  text-transform: capitalize;
  background-color: var(--color-red-100);
  border-radius: 0.4rem;
  cursor: pointer;
  color: var(--color-white);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
  transition: color var(--transition-200), background var(--transition-200);

  &:hover {
    color: var(--color-red-100);
    background-color: transparent;

    span {
      border: 0.2rem solid var(--color-red-100);
      border-bottom-color: var(--color-white);
    }
  }
`;

const DeleteIcon = styled(IconTrashOutline)`
  height: 1.3rem;
  width: 1.3rem;
  color: inherit;
`;

function AccountSettings() {
  // state to control password visibility
  const [showPassord, setShowPssword] = useState(false);
  // user custom hook to display the email as a default value
  const { user, isLoadingUser } = useUser();
  // react hook form to handle the inputs
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      newEmail: user?.email,
    },
  });
  // custom hook to handle changing the password
  const {
    resetPassword,
    isPending: isChangingPassword,
    error: passwordError,
  } = useChangePassword();

  // custom hook to handle changing the email
  const {
    resetEmail,
    isPending: isChangingEmail,
    error: emailError,
  } = useChangeEmail();

  // password visibility handler
  function handleShowPassword(e) {
    e.preventDefault();
    setShowPssword(showPassord => !showPassord);
  }

  // submit handler
  function onSubmit(data) {
    // if the user has not changed the email
    if (data.newEmail !== user.email) {
      resetEmail({ newEmail: data.newEmail });
    }

    // if there is a new password in the input
    if (data.newPassword) {
      resetPassword({ newPassword: data.newPassword });
    }
    // reset after submition
    reset();
  }

  // handler to delete the account
  function handleDelete(e) {
    e.preventDefault();
    // how to delete the account
  }

  if (isLoadingUser) return <Spinner />;

  // show an error notification if there is one
  if (passwordError) toast.error(passwordError.message);
  if (emailError) toast.error(emailError.message);

  return (
    <StyledAccountSettings>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Title>Account settings</Title>
        </Header>
        {/* change email */}
        <Wrapper>
          <Label htmlFor="change_email_input">Email:</Label>
          <Input
            className="email-input"
            id="change_email_input"
            type="email"
            placeholder=""
            {...register('newEmail')}
          />

          {/* change password */}

          <Label htmlFor="change_password_input">Password:</Label>
          <InputContainer>
            <Input
              id="change_password_input"
              type={showPassord ? 'text' : 'password'}
              placeholder="new password"
              {...register('newPassword')}
            />
            {/* password visibility buttons */}
            {showPassord ? (
              <EyeOffIcon onClick={handleShowPassword} />
            ) : (
              <EyeOnIcon onClick={handleShowPassword} />
            )}
          </InputContainer>
        </Wrapper>

        <DeleteAccountButton onClick={handleDelete}>
          <DeleteIcon /> Delete account
        </DeleteAccountButton>
        <SaveButton type="submit">
          {!isChangingPassword && !isChangingEmail && <SaveIcon />}
          {(isChangingPassword || isChangingEmail) && <SmallSpinner />} update
          profile
        </SaveButton>
        {/* delete account */}
      </form>
    </StyledAccountSettings>
  );
}

export default AccountSettings;
