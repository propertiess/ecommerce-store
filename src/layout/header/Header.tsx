import {
  Burger,
  clsx,
  Flex,
  Group,
  Header as MantineHeader,
  MediaQuery
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Logo } from '@/components/Logo';
import { SwitcherThemeButton } from '@/components/SwitcherThemeButton';

import { BurgerMenu } from './burger/BurgerMenu';
import { Navbar, notAuthorizationLinks } from './navbar';

export const Header = () => {
  const [burgerMenuOpened, { toggle }] = useDisclosure();

  return (
    <MantineHeader
      height='auto'
      p='xs'
      className={clsx(burgerMenuOpened && 'fixed')}
    >
      <Flex align='center' justify='space-between'>
        <Logo />
        <Group>
          <Navbar links={notAuthorizationLinks} onLogOut={undefined} />
          <SwitcherThemeButton />
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Burger opened={burgerMenuOpened} onClick={toggle} />
          </MediaQuery>
        </Group>
        <BurgerMenu
          opened={burgerMenuOpened}
          onChange={toggle}
          links={notAuthorizationLinks}
          onLogOut={undefined}
        />
      </Flex>
    </MantineHeader>
  );
};
