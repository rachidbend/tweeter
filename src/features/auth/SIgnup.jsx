import styled from 'styled-components';

const StyledSignup = styled.div`
  min-height: 100vh;
  min-height: 100svh;
  background-color: var(--color-grey-600);

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img``;
const Heading = styled.h2`
  font-family: var(--font-poppings);
  font-size: 3.4rem;
  font-weight: 700;
  text-transform: capitalize;
  color: var(--color-blue-100);
`;

const Input = styled.input`
  width: auto;

  border: 1px solid red;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

function Signup() {
  return (
    <StyledSignup>
      <div>
        <Logo src="/images/tweeter.svg" />
      </div>
      <div>
        <Heading>Create an account!</Heading>
        <Form>
          <label htmlFor="email-input">email</label>
          <Input type="email" id="email-input" />

          <label htmlFor="password-input">password</label>
          <Input type="password" id="password-input" />

          <label htmlFor="password-confirm-input">confirm password</label>
          <Input type="password" id="password-confirm-input" />
        </Form>
      </div>
    </StyledSignup>
  );
}

export default Signup;
