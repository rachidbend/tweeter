import styled from 'styled-components';
import { useDarkMode } from '../../contexts/DarkModeContext';

const StyledPreferencesSettings = styled.div``;

function PreferencesSettings() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  console.log(isDarkMode);

  return (
    <StyledPreferencesSettings>
      PreferencesSettings
      <button onClick={toggleDarkMode}>toggle mode</button>
    </StyledPreferencesSettings>
  );
}

export default PreferencesSettings;
