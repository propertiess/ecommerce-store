import { Center, Loader } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { useGetProducts } from '@/screens/home/hooks/useGetProducts';
import { TBasketItem } from '@/store/basket/Basket';

import { BasketItem } from './BasketItem';

type Props = {
  basket: TBasketItem[];
};

export const BasketList = observer(({ basket }: Props) => {
  const { data, isFetching } = useGetProducts();

  if (isFetching) {
    return (
      <Center className='mt-3'>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      {basket.length ? (
        basket.map(item => (
          <BasketItem key={item.productId} item={item} products={data!} />
        ))
      ) : (
        <Center className='mt-3'>Товаров нет!</Center>
      )}
    </>
  );
});
