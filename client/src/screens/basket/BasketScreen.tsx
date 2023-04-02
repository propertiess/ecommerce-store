import { Title } from '@mantine/core';

import { BasketList } from './components/BasketList';

export const BasketScreen = () => {
  return (
    <>
      <Title mt='md'>Корзина</Title>
      <BasketList />
    </>
  );
};
