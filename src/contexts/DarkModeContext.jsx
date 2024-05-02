import { createContext, useContext, useEffect } from 'react';
import useLocalStorageState from './../helpers/useLocalStorageState';
import { useGetIsDarkMode } from '../hooks/darkMode/useGetIsDarkMode';
import { useToggleDarkMode } from '../hooks/darkMode/useToggleDarkMode';
import toast from 'react-hot-toast';

const DarkModeContext = createContext();

// 1- what ever is in the server should be in the local storage
// 2- we rely on the local storage to get instant dark mode toggle
// 3- we use the isDarkMode on the database to track the prefrance on everywhere

export function DarkModeProvider({ children }) {
  // state to track the dark mode in local storage, and to make changing the theme look fast
  const [isDarkMode, setIsDarkMode] = useLocalStorageState({
    initialState: false,
    key: 'isDarkMode',
  });

  // custom hook to get the isDarkMode state from the database
  const { isDarkMode: isServerDarkMode, error } = useGetIsDarkMode();
  // custom hook to change the isDarkMode state in the database
  const { toggleDarkMode: toggleServerDarkMode, error: toggleError } =
    useToggleDarkMode();

  // function to toggle the isDarkMode state both in the local storage and the database
  function toggleDarkMode() {
    setIsDarkMode(isDarkMode => !isDarkMode);
    toggleServerDarkMode({ nextIsDarkMode: !isDarkMode });
  }

  // effect to make sure the value of the isDarkMode is not undefined so that it does not give an error and stop the app from working, it only runs on mount
  useEffect(function () {
    if (isServerDarkMode === undefined) setIsDarkMode(false);
    if (isDarkMode === undefined || isDarkMode === 'undefined')
      setIsDarkMode(false);
  }, []);

  // effect to make sure the local storage and database are in sync
  useEffect(
    function () {
      // make sure that the local storage is set to the users prefrance that is kept in the database
      if (isServerDarkMode === undefined) setIsDarkMode(false);
      if (isDarkMode === undefined || isDarkMode === 'undefined')
        setIsDarkMode(false);
      else setIsDarkMode(isServerDarkMode);
    },
    [isServerDarkMode]
  );

  // effect to handle fast theme changing
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

  // error notifications
  if (error) toast.error(error.message);
  if (toggleError) toast.error(toggleError.message);

  // returning the provider and children
  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
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
