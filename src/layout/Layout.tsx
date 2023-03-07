import { PropsWithChildren } from 'react';
import { Flex, Footer, Header, Text } from '@mantine/core';
import Head from 'next/head';

import { Logo } from '@/components/Logo';

import { links, Navbar } from './navbar';

type Props = PropsWithChildren & {
  title: string;
  description?: string;
};

export const Layout = ({ title, description, children }: Props) => {
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
      <Header height='auto' p='xs'>
        <Flex align='center' justify='space-between'>
          <Logo />
          <Navbar links={links} />
        </Flex>
      </Header>
      <main className='flex-grow'>{children}</main>
      <Footer height='auto' p='xs'>
        <Text className='text-center'>
          Shop &copy; 2023. Все права защищены.
        </Text>
      </Footer>
    </>
  );
};
