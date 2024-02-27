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
import { useSignup } from '../../hooks/authHooks/useSignup';

function Signup() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const { register, handleSubmit, reset } = useForm();

  const { signup, isSigningUp, signupError } = useSignup();

  function onSubmit(data) {
    const { email, password, confirmPassword } = data;
    if (confirmPassword === password)
      signup({ email: email, password: password });
  }

  function handlePasswordVisibility() {
    setIsVisiblePassword(isVisiblePassword => !isVisiblePassword);
  }

  function handleConfirmPasswordVisibility() {
    setIsVisibleConfirmPassword(
      isVisibleConfirmPassword => !isVisibleConfirmPassword
    );
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
        <Heading>Create account</Heading>

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
          {/* confirm password input */}
          <InputContainer>
            <Input
              type={`${isVisibleConfirmPassword ? 'text' : 'password'}`}
              placeholder="Confirm Password"
              {...register('confirmPassword')}
            />
            {isVisibleConfirmPassword ? (
              <EyeOffIcon onClick={handleConfirmPasswordVisibility} />
            ) : (
              <EyeOnIcon onClick={handleConfirmPasswordVisibility} />
            )}
          </InputContainer>

          {/* {loginError && <p>{loginError.message}</p>} */}

          <LoginButton type="submit" value="Create" />
        </form>

        <OrContainer>
          <OrText>or</OrText>
        </OrContainer>

        <Google>
          <GoogleIcon /> Signup with Google
        </Google>

        <SignupText>
          Already have an account?
          <SignupButton to="/login"> Log in</SignupButton>
        </SignupText>
      </Container>
    </StyledLogin>
  );
}

export default Signup;
