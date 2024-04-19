import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };
export const GlobalStyles = styled.createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :root {
    /* LIGHT theme */
    &,
    &.light {
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
      --color-grey-700: hsla(0, 0%, 98%, 1); /* comment input background */

      --shadow-100: 0px 2px 4px 0px hsla(0, 0%, 0%, 0.05);
      --shadow-200: 0px 2px 2px 0px hsla(0, 0%, 0%, 0.05);

      /* profile overlay background */
      --color-background-overlay: hsla(0, 0%, 0%, 0.2);

      /* profile image input label background  */
      --color-black-transparent: rgba(0, 0, 0, 0.5);

      /* skeletal ui shimmer colors */
      --color-shimmer-100: #eee;
      --color-shimmer-200: #ddd;
    }
    /* DARK theme */
    &.dark {
      --color-white: #15202b;
      --color-black: hsla(0, 0%, 100%, 1);

      --color-grey-100: hsla(0, 0%, 100%, 1); /* text */
      --color-grey-200: hsla(0, 0%, 74%, 1);
      --color-grey-300: #8899ac; /* nav */
      --color-grey-400: hsla(0, 0%, 74%, 1);
      --color-grey-500: hsl(207, 38%, 6%); /* borders */
      --color-grey-600: hsl(207, 38%, 6%); /* page background */
      --color-grey-700: #192734; /* comment input background */

      --shadow-100: 0px 2px 4px 0px hsla(0, 0%, 80%, 0.05);
      --shadow-200: 0px 2px 2px 0px hsla(0, 0%, 80%, 0.05);

      /* profile overlay background */
      --color-background-overlay: hsla(0, 0%, 0%, 0.5);

      /* profile image input label background  */
      --color-black-transparent: rgba(0, 0, 0, 0.5);

      /* skeletal ui shimmer colors */
      --color-shimmer-100: hsl(207, 38%, 6%);
      --color-shimmer-200: hsl(205, 37%, 12%);
    }

    --font-poppings: 'Poppins', sans-serif; /*  600, 500 */
    --font-noto: 'Noto Sans', sans-serif; /*  700, 600, 500, 400 */

    --transition-100: 0.3s ease;
    --transition-200: 0.2s ease;
    --transition-300: 0.26s ease;

    --content-max-width: 107.3rem;
    --page-padding-large: 5.4rem;
    --page-padding-small: 1.66rem;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    min-height: 100vh;
    min-height: 100svh;
  }
`;

/*
all media queries
- mobile
  @media screen and (max-width: 450px) {

  }


- large desktop
  @media screen and (min-width: 1600px) {

  }

*/
