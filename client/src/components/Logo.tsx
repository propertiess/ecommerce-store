import { Flex, Title } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logo from '@/../public/logo.svg';

import { A } from './A';

export const Logo = () => {
  const router = useRouter();

  return (
    <Flex gap='xs'>
      <A active={router.asPath === '/'} href='/'>
        <Image width={43} height={43} src={logo} alt='Logo' />
      </A>
      <Title className='uppercase'>Shop</Title>
    </Flex>
  );
};
