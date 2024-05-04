import styled from 'styled-components';
import {
  Container,
  Heading,
  Illustration,
  IllustrationContainer,
  SubmitButton,
  Logo,
  StyledLogin,
} from '../features/auth/AuthStyles';
import { useForm } from 'react-hook-form';

import EmailInput from '../ui/EmailInput';
import { Link, useNavigate } from 'react-router-dom';
import useForgotPassword from '../hooks/authHooks/useForgotPassword';
import toast from 'react-hot-toast';

const ButtonsContainer = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled(Link)`
  background: none;
  border: none;
  font-family: var(--font-poppings);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-200);
  transition: color var(--transition-100);
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: var(--color-blue-100);
  }
`;

const StyledSubmitButton = styled(SubmitButton)`
  width: auto;
`;

const Label = styled.p`
  font-family: var(--font-noto);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-100);
  /* text-transform: capitalize; */
  padding-left: 0.4rem;
  margin-bottom: 1.6rem;
  text-decoration: underline;
  text-underline-offset: 0.4rem;
`;

function ForgotPassword() {
  // Form handling using useForm hook from react-hook-form
  const { register, handleSubmit, reset } = useForm();

  const { requestForgotPassword, isPending, error } = useForgotPassword();

  const navigate = useNavigate();

  // Form submission handler
  function onSubmit(data) {
    // request a reset password email
    requestForgotPassword(
      { email: data.email },
      {
        onSuccess: () => {
          navigate('/check-email');
        },
      }
    );

    // Reset form after submission
    reset();

    // send user to check your email page
  }

  if (error) toast.error(error.message);

  return (
    <StyledLogin>
      {/* Illustration */}
      <IllustrationContainer>
        <Illustration
          src="/images/drawkit-grape-pack-illustration-3.svg"
          alt="illustration"
        />
      </IllustrationContainer>
      {/* Login form container */}

      <Container>
        {/* Logo */}
        <Logo src="/images/tweeter-small.svg" alt="tweeter logo" />

        {/* Heading */}
        <Heading>Forgot password</Heading>

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <Label>Enter your email:</Label>
          <EmailInput register={register} />

          {/* Submit or Login button */}
          <ButtonsContainer>
            <BackButton to="/login">Back</BackButton>
            <StyledSubmitButton
              disabled={isPending}
              type="submit"
              value="Next"
            />
          </ButtonsContainer>
        </form>
      </Container>
    </StyledLogin>
  );
}

export default ForgotPassword;
