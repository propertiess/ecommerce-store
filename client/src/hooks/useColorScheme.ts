import { useEffect, useState } from 'react';
import { ColorScheme } from '@mantine/core';
import { hasCookie, setCookie } from 'cookies-next';

export const useColorScheme = (theme: ColorScheme) => {
  const [colorScheme, setColorScheme] = useState(() => theme);

  useEffect(() => {
    if (!hasCookie('theme')) {
      setCookie('theme', colorScheme, {
        expires: new Date(new Date().getTime() + 15 * 365 * 24 * 60 * 60 * 1000)
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleColorScheme = (value: ColorScheme) => {
    setColorScheme(value);
    setCookie('theme', value, {
      expires: new Date(new Date().getTime() + 15 * 365 * 24 * 60 * 60 * 1000)
    });
  };

  return { colorScheme, toggleColorScheme };
};
