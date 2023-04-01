import { Button, Flex, Group, Stack, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { Minus, Plus } from 'tabler-icons-react';

import { TBasketItem, useBasketStore } from '@/store/basket/Basket';
import { Product } from '@/types';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

type Props = {
  item: TBasketItem;
  products: Product[];
};

export const BasketItem = observer(({ item, products }: Props) => {
  const { setItemQuantity, removeItem } = useBasketStore();

  const product = products.find(el => el.id === item.productId)!;

  const onMinusHandle = () => {
    if (item.quantity === 1) {
      removeItem(item.productId);
      return;
    }

    setItemQuantity(item.productId, item.quantity - 1);
  };

  return (
    <Flex className='mt-5 justify-between rounded bg-main/20 p-3'>
      <Flex>
        <Image
          className='object-contain'
          width={150}
          height={150}
          src={product.img}
          alt={product.title}
        />
        <Stack>
          <Text weight={500}>{product.title}</Text>
          <Text>{product.description}</Text>
          <Text>{convertCurrency(product.price)}</Text>
        </Stack>
      </Flex>
      <Stack>
        <Text>Количество товара: {item.quantity}</Text>
        <Group position='center'>
          <Button
            variant='gradient'
            onClick={() => setItemQuantity(item.productId, item.quantity + 1)}
          >
            <Plus />
          </Button>
          <Button variant='gradient' onClick={onMinusHandle}>
            <Minus />
          </Button>
        </Group>
      </Stack>
    </Flex>
  );
});
