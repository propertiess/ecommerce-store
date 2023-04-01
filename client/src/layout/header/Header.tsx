import {
  Burger,
  clsx,
  Flex,
  Group,
  Header as MantineHeader,
  MediaQuery
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { observer } from 'mobx-react-lite';

import { Logo } from '@/components/Logo';
import { SwitcherThemeButton } from '@/components/SwitcherThemeButton';
import { useAuthStore } from '@/store/auth/Auth';

import { BurgerMenu } from './burger/BurgerMenu';
import { Navbar, notAuthorizationLinks, privateLinks } from './navbar';
import { UserAvatar } from './UserAvatar';

export const Header = observer(() => {
  const [burgerMenuOpened, { toggle }] = useDisclosure();

  const { isAdmin, isUser } = useAuthStore();

  const chooseLinks = () => {
    if (isAdmin) {
      return privateLinks;
    }

    return notAuthorizationLinks;
  };

  return (
    <MantineHeader
      height='auto'
      p='xs'
      className={clsx(burgerMenuOpened && 'fixed')}
    >
      <Flex align='center' justify='space-between'>
        <Logo />
        <Group>
          <Navbar links={chooseLinks()} />
          {(isAdmin || isUser) && <UserAvatar />}
          <SwitcherThemeButton />
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Burger opened={burgerMenuOpened} onClick={toggle} />
          </MediaQuery>
        </Group>
        <BurgerMenu
          opened={burgerMenuOpened}
          onChange={toggle}
          links={chooseLinks()}
        />
      </Flex>
    </MantineHeader>
  );
});
