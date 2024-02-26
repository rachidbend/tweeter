import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };
export const GlobalStyles = styled.createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :root {
    --color-blue-100: hsla(214, 84%, 56%, 1);
    --color-blue-200: hsla(202, 71%, 52%, 1);
    --color-green-100: hsla(145, 63%, 42%, 1);
    --color-red-100: hsla(0, 79%, 63%, 1);

    --color-white: hsla(0, 0%, 100%, 1);
    --color-black: hsla(0, 0%, 0%, 1);

    --color-grey-100: hsla(0, 0%, 20%, 1); /* text */
    --color-grey-200: hsla(0, 0%, 31%, 1);
    --color-grey-300: hsla(0, 0%, 51%, 1); /* nav */
    --color-grey-400: hsla(0, 0%, 74%, 1);
    --color-grey-500: hsla(0, 0%, 88%, 1); /* borders */
    --color-grey-600: hsla(0, 0%, 95%, 1); /* page background */

    --font-poppings: 'Poppins', sans-serif; /*  600, 500 */
    --font-noto: 'Noto Sans', sans-serif; /*  700, 600, 500, 400 */
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    min-height: 100svh;
  }
`;
