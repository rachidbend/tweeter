import {
  Container,
  ForgotPassword,
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
import { useLogin } from '../hooks/authHooks/useLogin';
import PasswordInput from '../ui/PasswordInput';
import OrComponent from '../ui/OrComponent';
import GoogleButton from '../ui/GoogleButton';
import EmailInput from '../ui/EmailInput';

function Login() {
  // State to manage password visibility

  // Form handling using useForm hook from react-hook-form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: 'example@gmail.com', password: '123456789' },
  });

  // Login functionality using custom useLogin hook
  const { login, isLogingIn } = useLogin();

  // Form submission handler
  function onSubmit(data) {
    // Call login function with email and password
    login({ email: data.email, password: data.password });
    // Reset form after submission
    reset();
  }

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
        <Heading>welcome back</Heading>

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <EmailInput register={register} />
          {/* Password input */}
          <PasswordInput register={register} />
          {/* Forgot password link */}
          <ForgotPassword>Forgot password?</ForgotPassword>

          {/* Submit or Login button */}
          <SubmitButton disabled={isLogingIn} type="submit" value="login" />
        </form>

        {/* Or sepirator container */}
        <OrComponent />
        {/* Google login */}
        <GoogleButton />
        {/* Signup link */}
        <CtaText>
          Don&apos;t have an account yet?
          <CtaButton to="/signup"> Sign up</CtaButton>
        </CtaText>
      </Container>
    </StyledLogin>
  );
}

export default Login;
