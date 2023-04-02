import { Center, Loader } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { useBasketList } from '../hooks/useBasketList';

import { BasketItem } from './BasketItem';

export const BasketList = observer(() => {
  const { basket, basketItems, isFetching } = useBasketList();

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
        <>
          {basket &&
            basket.map(({ productId, quantity }, idx) => (
              <BasketItem
                key={productId}
                {...basketItems[idx]}
                productId={productId}
                quantity={quantity}
              />
            ))}
        </>
      ) : (
        <Center className='mt-3'>Список товаров пуст</Center>
      )}
    </>
  );
});
