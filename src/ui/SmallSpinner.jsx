import styled from 'styled-components';

const SyledSmallSpinner = styled.span`
  width: ${props => (props.$width ? props.$width : '1.4rem')};
  height: ${props => (props.$height ? props.$height : '1.4rem')};
  border: 0.2rem solid var(--color-white);
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

function SmallSpinner({ width, height }) {
  return (
    <SyledSmallSpinner $width={width} $height={height}></SyledSmallSpinner>
  );
}

export default SmallSpinner;
