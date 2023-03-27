import { Button, Tooltip, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'tabler-icons-react';

export const SwitcherThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const onChangeTheme = () => {
    if (colorScheme === 'light') {
      toggleColorScheme('dark');
    } else {
      toggleColorScheme('light');
    }
  };

  return (
    <Tooltip
      label={colorScheme === 'light' ? 'Dark mode' : 'Light mode'}
      withinPortal={true}
    >
      <Button variant='gradient' onClick={onChangeTheme}>
        {colorScheme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </Button>
    </Tooltip>
  );
};
