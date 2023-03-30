import { Button, Tooltip, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'tabler-icons-react';

export const SwitcherThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isLight = colorScheme === 'light';

  const onChangeTheme = () => {
    toggleColorScheme(isLight ? 'dark' : 'light');
  };

  return (
    <Tooltip label={isLight ? 'Dark mode' : 'Light mode'}>
      <Button variant='gradient' onClick={onChangeTheme}>
        {isLight ? <Moon size={24} /> : <Sun size={24} />}
      </Button>
    </Tooltip>
  );
};
