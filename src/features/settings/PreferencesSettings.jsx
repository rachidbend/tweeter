import styled from 'styled-components';
import { useDarkMode } from '../../contexts/DarkModeContext';

const StyledPreferencesSettings = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4.6rem;

  @media screen and (max-width: 450px) {
    margin-bottom: 2.8rem;
    margin-top: 1.4rem;
  }
`;
const Title = styled.h3`
  font-family: var(--font-poppings);
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  text-transform: capitalize;
  color: var(--color-grey-200);

  @media screen and (max-width: 450px) {
  }
`;
const Label = styled.p`
  display: inline-block;
  font-family: var(--font-noto);
  font-size: 1.4rem;
  color: var(--color-grey-100);
  margin-bottom: 0.6rem;
  margin-left: 0.2rem;
  margin-right: 1.2rem;
  letter-spacing: -0.035em;
`;

const Button = styled.button`
  display: inline-block;
  font-family: var(--font-noto);
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.6rem 1.2rem;
  border: 0.2rem solid var(--color-grey-500);
  background-color: var(--color-grey-600);
  color: var(--color-grey-100);
  border-radius: 0.6rem;
  text-transform: capitalize;
  letter-spacing: -0.035em;
`;

function PreferencesSettings() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <StyledPreferencesSettings>
      <Header>
        <Title>Preferences settings</Title>
      </Header>
      <Label>Change theme:</Label>
      <Button onClick={toggleDarkMode}>
        {isDarkMode ? 'Dark' : 'Light'} theme
      </Button>
    </StyledPreferencesSettings>
  );
}

export default PreferencesSettings;
