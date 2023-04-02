import { Title } from '@mantine/core';

import { LikedList } from './components/LikedList';

export const LikedScreen = () => {
  return (
    <>
      <Title mt='md'>Избранное</Title>
      <LikedList />
    </>
  );
};
