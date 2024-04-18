import { createContext, useContext, useEffect } from 'react';
import useLocalStorageState from './../helpers/useLocalStorageState';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState({
    initialState: false,
    key: 'isDarkMode',
  });

  function toggleDarkMode() {
    setIsDarkMode(isDarkMode => !isDarkMode);
  }

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
      if (!isDarkMode) {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    },
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}
