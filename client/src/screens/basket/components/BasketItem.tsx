import { Button, Flex, Group, Paper, Stack, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { Minus, Plus } from 'tabler-icons-react';

import { TBasketItem, useBasketStore } from '@/store/basket/Basket';
import { Product } from '@/types';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

export type BasketItemProps = Omit<Product, 'id'> & TBasketItem;

export const BasketItem = observer((props: BasketItemProps) => {
  const { setItemQuantity, removeItem } = useBasketStore();

  const onMinusHandle = () => {
    if (props.quantity === 1) {
      removeItem(props.productId);
      return;
    }

    setItemQuantity(props.productId, props.quantity - 1);
  };

  return (
    <Paper className='mt-5 flex items-center justify-between' p='md' withBorder>
      <Flex>
        <Image
          className='object-contain'
          width={150}
          height={150}
          src={props.img}
          alt={props.title}
        />
        <Stack>
          <Text weight={500}>{props.title}</Text>
          <Text>{props.description}</Text>
          <Text>{convertCurrency(props.price)}</Text>
        </Stack>
      </Flex>
      <Stack>
        <Text>Количество товара: {props.quantity}</Text>
        <Group position='center'>
          <Button
            variant='gradient'
            onClick={() => setItemQuantity(props.productId, props.quantity + 1)}
          >
            <Plus />
          </Button>
          <Button variant='gradient' onClick={onMinusHandle}>
            <Minus />
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
});
