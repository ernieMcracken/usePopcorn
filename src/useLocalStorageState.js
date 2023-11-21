import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [val, setVal] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [val, key]);

  return [val, setVal];
}
