import {
  Container,
  Heading,
  Illustration,
  IllustrationContainer,
  SubmitButton,
  Logo,
  CtaText,
  CtaButton,
  StyledLogin,
} from '../features/auth/AuthStyles';
import { useForm } from 'react-hook-form';

import { useSignup } from '../hooks/authHooks/useSignup';
import PasswordInput from '../ui/PasswordInput';
import OrComponent from '../ui/OrComponent';
import GoogleButton from '../ui/GoogleButton';
import EmailInput from '../ui/EmailInput';

function Signup() {
  // Form handling using useForm hook from react-hook-form
  const { register, handleSubmit, reset } = useForm();

  // Signup functionality using custom useSignup hook
  const { signup, isSigningUp } = useSignup();

  // Form submission handler
  function onSubmit(data) {
    const { email, password, confirm } = data;

    if (confirm === password) signup({ email: email, password: password });
    reset();
  }

  return (
    <StyledLogin>
      {/* Illustration */}
      <IllustrationContainer>
        <Illustration
          src="/images/drawkit-grape-pack-illustration-11.svg"
          alt="illustration"
        />
      </IllustrationContainer>
      {/* Signup form container */}
      <Container>
        {/* Logo */}
        <Logo src="/images/tweeter-small.svg" />
        {/* Heading */}
        <Heading>Create account</Heading>

        {/* Signup form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <EmailInput register={register} />

          {/* Password input */}
          <PasswordInput register={register} />
          {/* Confirm password input */}
          <PasswordInput register={register} variant="confirm" />

          {/* Submit button */}

          <SubmitButton disabled={isSigningUp} type="submit" value="Create" />
        </form>

        {/* Or sepirator container */}
        <OrComponent />

        {/* Google signup */}
        <GoogleButton />

        {/* Login link */}
        <CtaText>
          Already have an account?
          <CtaButton to="/login"> Log in</CtaButton>
        </CtaText>
      </Container>
    </StyledLogin>
  );
}

export default Signup;
