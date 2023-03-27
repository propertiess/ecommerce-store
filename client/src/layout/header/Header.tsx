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
import {
  authorizationLinks,
  Navbar,
  notAuthorizationLinks,
  privateLinks
} from './navbar';

export const Header = observer(() => {
  const [burgerMenuOpened, { toggle }] = useDisclosure();

  const { removeToken, isAdmin, isUser } = useAuthStore();

  const chooseLinks = () => {
    if (isAdmin) {
      return privateLinks;
    }

    if (isUser) {
      return authorizationLinks;
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
          <Navbar
            links={chooseLinks()}
            onLogOut={isAdmin || isUser ? removeToken : undefined}
          />
          <SwitcherThemeButton />
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Burger opened={burgerMenuOpened} onClick={toggle} />
          </MediaQuery>
        </Group>
        <BurgerMenu
          opened={burgerMenuOpened}
          onChange={toggle}
          links={chooseLinks()}
          onLogOut={isAdmin || isUser ? removeToken : undefined}
        />
      </Flex>
    </MantineHeader>
  );
});
