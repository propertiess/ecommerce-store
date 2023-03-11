import { PropsWithChildren } from 'react';
import { Container, Footer, Text } from '@mantine/core';
import Head from 'next/head';

import { Header } from './header';

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
      <Header />
      <main className='flex-grow'>
        <Container fluid={true}>{children}</Container>
      </main>
      <Footer
        height='auto'
        p='xs'
        // className={clsx(burgerMenuOpened && 'hidden')}
      >
        <Text className='text-center'>
          Shop &copy; 2023. Все права защищены.
        </Text>
      </Footer>
    </>
  );
};
