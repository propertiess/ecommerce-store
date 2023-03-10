import { Button, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

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
    <Tooltip label={colorScheme === 'light' ? 'Dark mode' : 'Light mode'}>
      <Button variant='gradient' onClick={onChangeTheme}>
        {colorScheme === 'light' ? (
          <IconMoon size={24} />
        ) : (
          <IconSun size={24} />
        )}
      </Button>
    </Tooltip>
  );
};
