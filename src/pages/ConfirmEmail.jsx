import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledConfirmEmail = styled.div`
  background-color: var(--color-blue-100);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-height: 100svh;

  @media screen and (max-width: 450px) {
    background-color: var(--color-grey-600);
  }
`;

const Container = styled.div`
  background-color: var(--color-grey-600);
  /* border: 0.2rem solid var(--color-grey-400); */
  border-radius: 0.8rem;
  padding: 4.8rem;
  text-align: center;

  box-shadow: var(--shadow-100);

  @media screen and (max-width: 450px) {
    width: 100%;
    box-shadow: none;
  }
`;

const Title = styled.h1`
  font-family: var(--font-poppings);
  font-size: 2rem;
  color: var(--color-grey-100);

  font-weight: 600;

  letter-spacing: -0.035rem;
  margin-bottom: 2.4rem;
`;

const Text = styled.p`
  font-family: var(--font-noto);
  font-weight: 500;
  font-size: 1.4rem;
  letter-spacing: -0.035rem;
  line-height: 2.179rem;
  margin-bottom: 3rem;
`;

const Logo = styled.img`
  height: 4.8rem;
  width: auto;
  margin-bottom: 1.2rem;
`;

const LoginButton = styled(Link)`
  border: none;
  background-color: none;
  cursor: pointer;
  font-family: var(--font-poppings);
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-blue-100);
  padding: 0.6rem;
  text-decoration: underline;
  text-underline-offset: 0.6rem;

  transition: color var(--transition-200);
  &:hover {
    color: var(--color-grey-300);
  }
`;

const Break = styled.br`
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

function ConfirmEmail() {
  return (
    <StyledConfirmEmail>
      <Container>
        <Logo src="/images/tweeter-small.svg" />
        <Title> Check your inbox, please!</Title>
        <Text>
          Hey, to start using Tweeter, we need to verify your email, <Break />{' '}
          We&apos;ve already sent out the verification link, Please check it and{' '}
          <Break />
          confirm it&apos;s really you. Thanks!
        </Text>

        <LoginButton to="/login" replace>
          Login
        </LoginButton>
      </Container>
    </StyledConfirmEmail>
  );
}

export default ConfirmEmail;
