import {
  Container,
  EyeOffIcon,
  EyeOnIcon,
  ForgotPassword,
  Google,
  GoogleIcon,
  Heading,
  Illustration,
  IllustrationContainer,
  Input,
  InputContainer,
  LoginButton,
  Logo,
  OrContainer,
  OrText,
  SignupText,
  SignupButton,
  StyledLogin,
} from './AuthStyles';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useLogin } from '../../hooks/authHooks/useLogin';

function Login() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: 'example@gmail.com', password: '123456789' },
  });

  const { login, loginError } = useLogin();
  function onSubmit(data) {
    login({ email: data.email, password: data.password });
  }

  function handlePasswordVisibility() {
    setIsVisiblePassword(isVisiblePassword => !isVisiblePassword);
  }

  return (
    <StyledLogin>
      <IllustrationContainer>
        <Illustration
          src="/images/drawkit-grape-pack-illustration-3.svg"
          alt="illustration"
        />
      </IllustrationContainer>
      <Container>
        <Logo src="/images/tweeter-small.svg" />
        <Heading>welcome back</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" placeholder="Email" {...register('email')} />

          <InputContainer>
            <Input
              type={`${isVisiblePassword ? 'text' : 'password'}`}
              placeholder="Password"
              {...register('password')}
            />
            {isVisiblePassword ? (
              <EyeOffIcon onClick={handlePasswordVisibility} />
            ) : (
              <EyeOnIcon onClick={handlePasswordVisibility} />
            )}
          </InputContainer>
          <ForgotPassword>Forgot password?</ForgotPassword>
          {loginError && <p>{loginError.message}</p>}

          <LoginButton type="submit" value="login" />
        </form>

        <OrContainer>
          <OrText>or</OrText>
        </OrContainer>

        <Google>
          <GoogleIcon /> Login with Google
        </Google>

        <SignupText>
          Don&apos;t have an account yet?
          <SignupButton to="/signup"> Sign up</SignupButton>
        </SignupText>
      </Container>
    </StyledLogin>
  );
}

export default Login;
