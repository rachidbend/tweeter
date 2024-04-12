import {
  Container,
  EyeOffIcon,
  EyeOnIcon,
  Google,
  GoogleIcon,
  Heading,
  Illustration,
  IllustrationContainer,
  Input,
  InputContainer,
  SubmitButton,
  Logo,
  OrContainer,
  OrText,
  CtaText,
  CtaButton,
  StyledLogin,
} from '../features/auth/AuthStyles';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSignup } from '../hooks/authHooks/useSignup';
import PasswordInput from '../ui/PasswordInput';

function Signup() {
  // State to manage password visibility

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
          <Input type="email" placeholder="Email" {...register('email')} />

          {/* Password input */}
          <PasswordInput register={register} />
          {/* Confirm password input */}
          <PasswordInput register={register} variant="confirm" />

          {/* Submit button */}

          <SubmitButton disabled={isSigningUp} type="submit" value="Create" />
        </form>

        {/* Or sepirator container */}
        <OrContainer>
          <OrText>or</OrText>
        </OrContainer>

        {/* Google signup */}
        <Google>
          <GoogleIcon /> Signup with Google
        </Google>

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
