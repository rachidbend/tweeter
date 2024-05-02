import { useEffect, useState } from 'react';

export default function useLocalStorageState({ initialState, key }) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    if (storedValue === 'undefined') return false;
    else return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
