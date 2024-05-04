import {
  Container,
  ForgotPasswordButton,
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
import { useNavigate } from 'react-router-dom';

function Login() {
  // Form handling using useForm hook from react-hook-form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: 'example@gmail.com', password: '123456789' },
  });

  const navigate = useNavigate();

  // Login functionality using custom useLogin hook
  const { login, isLogingIn } = useLogin();

  // Form submission handler
  function onSubmit(data) {
    // Call login function with email and password
    login({ email: data.email, password: data.password });
    // Reset form after submission
    reset();
  }

  // handler for forgot password button
  function handleForgotPassword(e) {
    e.preventDefault();
    navigate('/forgot-password');
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
          <ForgotPasswordButton onClick={handleForgotPassword}>
            Forgot password?
          </ForgotPasswordButton>

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
