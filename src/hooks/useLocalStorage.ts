import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(
    () => JSON.parse(localStorage.getItem(key) ?? "") || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
