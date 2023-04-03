import { Button, Group, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { observer } from 'mobx-react-lite';

import { useBasketStore } from '@/store/basket/Basket';
import { useOrderStore } from '@/store/order/Order';
import { convertCurrency } from '@/utils/helpers/convertCurrency';
import { showSuccessNotification } from '@/utils/helpers/notifications';

import { BasketList } from './components/BasketList';
import { useBasketList } from './hooks/useBasketList';

export const BasketScreen = observer(() => {
  const [isLoading, { open, close }] = useDisclosure(false);
  const { basket, percentDiscount, totalPrice, totalPriceWithBonus } =
    useBasketList();

  const { clearBasket } = useBasketStore();
  const { addItem } = useOrderStore();

  const onBuyHandler = async () => {
    open();

    await addItem({
      status: 'Buy',
      totalPrice: totalPriceWithBonus
    });

    await new Promise(res => {
      setTimeout(() => {
        res(1);
      }, 1500);
    });

    clearBasket();
    showSuccessNotification('Заказ успешно оформлен!');

    close();
  };

  return (
    <>
      <Title mt='md'>Корзина</Title>
      <BasketList />
      {!!basket.length && (
        <Group position='right' my='md'>
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
          <Button
            variant='gradient'
            onClick={onBuyHandler}
            disabled={isLoading}
            loading={isLoading}
          >
            Оплатить
          </Button>
        </Group>
      )}
    </>
  );
});
