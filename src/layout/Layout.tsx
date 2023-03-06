import { PropsWithChildren } from 'react';
import { Footer, Header } from '@mantine/core';
import Head from 'next/head';

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
        header
      </Header>
      <main className='flex-grow'>{children}</main>
      <Footer height='auto' p='xs'>
        footer
      </Footer>
    </>
  );
};
