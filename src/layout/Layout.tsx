import { PropsWithChildren } from 'react';
import {
  Burger,
  clsx,
  Container,
  Flex,
  Footer,
  Header,
  MediaQuery,
  Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Head from 'next/head';

import { Logo } from '@/components/Logo';

import { BurgerMenu } from './burger/BurgerMenu';
import { links, Navbar } from './navbar';

type Props = PropsWithChildren & {
  title: string;
  description?: string;
};

export const Layout = ({ title, description, children }: Props) => {
  const [burgerMenuOpened, { toggle }] = useDisclosure();

  return (
    <>
      <Head>
        <title>{title}</title>
        {description ? (
          <meta name='description' content={description} />
        ) : (
          <meta name='robots' content='noindex' />
        )}
      </Head>
      <Header
        height='auto'
        p='xs'
        className={clsx(burgerMenuOpened && 'fixed')}
      >
        <Flex align='center' justify='space-between'>
          <Logo />
          <Navbar links={links} />
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Burger opened={burgerMenuOpened} onClick={toggle} />
          </MediaQuery>
          <BurgerMenu opened={burgerMenuOpened} onChange={toggle} />
        </Flex>
      </Header>
      <main className={clsx('flex-grow', burgerMenuOpened && 'fixed')}>
        <Container fluid={true}>{children}</Container>
      </main>
      <Footer
        height='auto'
        p='xs'
        className={clsx(burgerMenuOpened && 'hidden')}
      >
        <Text className='text-center'>
          Shop &copy; 2023. Все права защищены.
        </Text>
      </Footer>
    </>
  );
};
