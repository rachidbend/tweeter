import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useLogin } from '../../hooks/authHooks/useLogin';

import { useState } from 'react';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';

const StyledLogin = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  height: 100vh;
  height: 100svh;

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;
const Illustration = styled.img`
  width: 60%;
`;

const IllustrationContainer = styled.div`
  background-color: var(--color-blue-100);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 450px) {
    display: none;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Logo = styled.img`
  width: 12rem;
  height: auto;
  margin-bottom: 2.4rem;
`;

const Heading = styled.h2`
  font-family: var(--font-poppings);
  font-size: 2.6rem;
  font-weight: 600;
  color: var(--color-grey-300);
  text-transform: capitalize;
  margin-bottom: 4.8rem;
`;

const Input = styled.input`
  border: 2px solid var(--color-grey-400);
  padding: 1.2rem 2.4rem;
  width: 30rem;
  display: block;
  border-radius: 0.8rem;
  margin-bottom: 1.6rem;
  background-color: none;
  font-family: var(--font-noto);
  font-size: 1.4rem;
  outline: none;
  color: var(--color-grey-100);
  transition: border var(--transition-100);
  &:focus,
  &:hover {
    border: 2px solid var(--color-blue-100);
  }
`;

const LoginButton = styled.input`
  width: 100%;
  font-family: var(--font-noto);
  text-transform: capitalize;
  border: 2px solid var(--color-blue-100);
  border-radius: 0.8rem;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-white);
  background-color: var(--color-blue-100);
  cursor: pointer;
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
  transition: background var(--transition-100), color var(--transition-100);
  &:hover {
    background-color: transparent;
    color: var(--color-blue-100);
  }
`;

const InputContainer = styled.div`
  position: relative;
`;
const EyeOnIcon = styled(IoMdEye)`
  position: absolute;
  top: 50%;
  right: 1rem;
  height: 2.4rem;
  width: auto;
  color: var(--color-grey-200);
  transform: translateY(-50%);
  cursor: pointer;
  transition: color var(--transition-200);
  &:hover {
    color: var(--color-blue-100);
  }
`;
const EyeOffIcon = styled(IoMdEyeOff)`
  position: absolute;
  top: 50%;
  right: 1rem;
  height: 2.4rem;
  width: auto;
  color: var(--color-grey-200);
  transform: translateY(-50%);
  cursor: pointer;

  &:hover {
    color: var(--color-blue-100);
  }
`;

const ForgotPassword = styled.button`
  font-family: var(--font-noto);
  color: var(--color-blue-200);
  font-size: 1.2rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  transition: color var(--transition-100);

  &:hover {
    color: var(--color-grey-300);
  }
`;

const OrContainer = styled.div`
  position: relative;
  width: 30rem;
  border-bottom: 1px solid var(--color-grey-400);
  margin-bottom: 2.4rem;
`;
const OrText = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-grey-300);
  position: absolute;
  bottom: 0;
  left: 50%;
  background-color: var(--color-white);
  padding: 0.4rem;
  transform: translate(-50%, 50%);
`;

const Google = styled.button``;

const Signup = styled.p`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-300);
`;
const SignupButton = styled(Link)`
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-blue-100);
  text-decoration: none;
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-blue-100);
  text-transform: uppercase;
  cursor: pointer;
  transition: color var(--transition-100), border var(--transition-100);

  &:hover {
    color: var(--color-grey-300);
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

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

        <Signup>
          Don&apos;t have an account yet?{' '}
          <SignupButton to="/signup">Sign up</SignupButton>
        </Signup>
      </Container>
    </StyledLogin>
  );
}

export default Login;
