import { useEffect, useState } from 'react';
import { ColorScheme } from '@mantine/core';
import { getCookie, setCookie } from 'cookies-next';

export const useColorScheme = (theme: ColorScheme) => {
  const [colorScheme, setColorScheme] = useState(() => theme);

  useEffect(() => {
    if (!getCookie('theme')) {
      setCookie('theme', colorScheme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleColorScheme = (value: ColorScheme) => {
    setColorScheme(value);
    setCookie('theme', value);
  };

  return { colorScheme, toggleColorScheme };
};
