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
    --color-grey-700: hsla(0, 0%, 98%, 1); /* comment input background */

    /* profile overlay background */
    --color-background-overlay: hsla(0, 0%, 0%, 0.1);

    /* profile image input label background  */
    --color-black-transparent: rgba(0, 0, 0, 0.5);

    --font-poppings: 'Poppins', sans-serif; /*  600, 500 */
    --font-noto: 'Noto Sans', sans-serif; /*  700, 600, 500, 400 */

    --shadow-100: 0px 2px 4px 0px hsla(0, 0%, 0%, 0.05);
    --shadow-200: 0px 2px 2px 0px hsla(0, 0%, 0%, 0.05);

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
    min-height: 100svh;
  }
`;

/*
all media queries
- mobile
  @media screen and (max-width: 450px) {

  }

    @media screen and (min-width: 1600px) {

  }


  CREATE OR REPLACE FUNCTION add_follower(target_id INT, new_follower JSON)
RETURNS VOID AS $$
DECLARE
    json_column_name TEXT;
    new_array JSON
BEGIN
    -- Assuming the table name is "your_table_name" and the JSON column name is "json_column"
    json_column_name := 'followers';
new_array := jsonb_build_array(new_follower) || json_column_name 
    -- Update the JSON column by appending the new item to the existing JSON array
    UPDATE profiles
    SET json_column_name = new_array
    WHERE id = target_id;
END;
$$ LANGUAGE plpgsql;
*/

/*
  CREATE OR REPLACE FUNCTION add_follower(target_id uuid, new_follower JSON)
RETURNS VOID AS $$

BEGIN
 
    -- Update the JSON column by appending the new item to the existing JSON array
    UPDATE profiles
    SET followers = json_build_array(new_follower) || followers
    WHERE id = target_id;
END;
$$ LANGUAGE plpgsql;
*/
