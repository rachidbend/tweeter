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
} from './AuthStyles';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSignup } from '../../hooks/authHooks/useSignup';

function Signup() {
  // State to manage password visibility
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  // Form handling using useForm hook from react-hook-form
  const { register, handleSubmit, reset } = useForm();

  // Signup functionality using custom useSignup hook
  const { signup, isSigningUp } = useSignup();

  // Form submission handler
  function onSubmit(data) {
    const { email, password, confirmPassword } = data;
    if (confirmPassword === password)
      signup({ email: email, password: password });
    reset();
  }

  // Function to toggle password visibility
  function handlePasswordVisibility() {
    setIsVisiblePassword(isVisiblePassword => !isVisiblePassword);
  }

  // Function to toggle confirm password visibility
  function handleConfirmPasswordVisibility() {
    setIsVisibleConfirmPassword(
      isVisibleConfirmPassword => !isVisibleConfirmPassword
    );
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
          <InputContainer>
            <Input
              type={`${isVisiblePassword ? 'text' : 'password'}`}
              placeholder="Password"
              {...register('password')}
            />
            {/* Toggle password visibility */}
            {isVisiblePassword ? (
              <EyeOffIcon onClick={handlePasswordVisibility} />
            ) : (
              <EyeOnIcon onClick={handlePasswordVisibility} />
            )}
          </InputContainer>
          {/* Confirm password input */}
          <InputContainer>
            <Input
              type={`${isVisibleConfirmPassword ? 'text' : 'password'}`}
              placeholder="Confirm Password"
              {...register('confirmPassword')}
            />
            {/* Toggle confirm password visibility */}
            {isVisibleConfirmPassword ? (
              <EyeOffIcon onClick={handleConfirmPasswordVisibility} />
            ) : (
              <EyeOnIcon onClick={handleConfirmPasswordVisibility} />
            )}
          </InputContainer>

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
