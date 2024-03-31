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

  @media screen and (max-width: 450px) {
    min-width: 10rem;
    /* margin-bottom: 2.6rem; */
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
    /* flex-direction: column;
    justify-content: start;
    align-items: start; */
    /* margin-bottom: 2.8rem; */
  }
`;
const Title = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  text-transform: capitalize;
  color: var(--color-grey-200);
  /* margin-bottom: 4.6rem; */
  @media screen and (max-width: 450px) {
    font-size: 1.4rem;
    /* display: none; */
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: min-content;
  /* width: auto; */
`;

function AccountSettings() {
  const [showPassord, setShowPssword] = useState(false);

  const { user, isLoadingUser } = useUser();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      newEmail: user?.email,
    },
  });
  const {
    resetPassword,
    isPending: isChangingPassword,
    error: passwordError,
  } = useChangePassword();
  const {
    resetEmail,
    isPending: isChangingEmail,
    error: emailError,
  } = useChangeEmail();

  function handleShowPassword(e) {
    e.preventDefault();
    setShowPssword(showPassord => !showPassord);
  }

  function onSubmit(data) {
    // console.log(data);
    if (data.newEmail !== user.email) {
      resetEmail({ newEmail: data.newEmail });
    }

    if (data.newPassword) {
      resetPassword({ newPassword: data.newPassword });
    }
  }
  if (isLoadingUser) return <Spinner />;

  if (passwordError) toast.error(passwordError.message);
  if (emailError) toast.error(emailError.message);
  return (
    <StyledAccountSettings>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Title>Account settings</Title>
          <SaveButton type="submit">
            {!isChangingPassword && !isChangingEmail && <SaveIcon />}
            {(isChangingPassword || isChangingEmail) && <SmallSpinner />} save
          </SaveButton>
        </Header>
        {/* change email */}
        <Wrapper>
          <Label htmlFor="change_email_input">Email:</Label>
          <Input
            id="change_email_input"
            type="email"
            placeholder=""
            {...register('newEmail')}
          />

          {/* change pass word */}

          <Label htmlFor="change_password_input">Password:</Label>
          <InputContainer>
            <Input
              id="change_password_input"
              type={showPassord ? 'text' : 'password'}
              placeholder=""
              {...register('newPassword')}
            />
            {showPassord ? (
              <EyeOffIcon onClick={handleShowPassword} />
            ) : (
              <EyeOnIcon onClick={handleShowPassword} />
            )}
          </InputContainer>
        </Wrapper>
        {/* delete account */}
      </form>
    </StyledAccountSettings>
  );
}

export default AccountSettings;
