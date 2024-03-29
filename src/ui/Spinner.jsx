import styled from 'styled-components';

const StyledSpinner = styled.span`
  width: 4.8rem;
  height: 4.8rem;
  border: 0.5rem solid var(--color-white);
  border-bottom-color: var(--color-blue-100);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Spinner() {
  return <StyledSpinner></StyledSpinner>;
}

export default Spinner;
