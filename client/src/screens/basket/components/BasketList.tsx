import { Button, Center, Group, Loader, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { useBasketStore } from '@/store/basket/Basket';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

import { useBasketList } from '../hooks/useBasketList';

import { BasketItem } from './BasketItem';

export const BasketList = observer(() => {
  const { basket, percentDiscount } = useBasketStore();
  const { basketItems, isFetching, totalPrice, totalPriceWithBonus } =
    useBasketList(basket, percentDiscount);

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
          <Group position='right' mt='md'>
            <Text>Итоговая сумма:</Text>
            {percentDiscount ? (
              <Group>
                <Text className='line-through'>
                  {convertCurrency(totalPrice)}
                </Text>
                <Text>{convertCurrency(totalPriceWithBonus)}</Text>
              </Group>
            ) : (
              convertCurrency(totalPrice)
            )}
            <Button variant='gradient'>Оплатить</Button>
          </Group>
        </>
      ) : (
        <Center className='mt-3'>Товаров нет!</Center>
      )}
    </>
  );
});
