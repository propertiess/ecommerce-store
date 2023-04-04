import { Button, Grid, Group, Paper, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { Minus, Plus } from 'tabler-icons-react';

import { TBasketItem, useBasketStore } from '@/store/basket/Basket';
import { Product } from '@/types';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

export type BasketItemProps = Omit<Product, 'id'> & TBasketItem;

export const BasketItem = observer((props: BasketItemProps) => {
  const { setItemQuantity, toggleBasketItem } = useBasketStore();

  const onMinusHandle = () => {
    if (props.quantity === 1) {
      toggleBasketItem({ productId: props.productId, quantity: 1 });
      return;
    }

    setItemQuantity(props.productId, props.quantity - 1);
  };

  return (
    <Paper
      className='mt-5 flex flex-wrap items-center justify-between gap-3'
      p='md'
      withBorder
    >
      <Grid className='w-full'>
        <Grid.Col span={12} md={2}>
          <Image
            className='object-contain'
            width={150}
            height={150}
            src={props.img}
            alt={props.title}
          />
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <Text weight={500} fz='lg'>
            {props.title}
          </Text>
          <Text>{props.description}</Text>
          <Text>{convertCurrency(props.price)}</Text>
        </Grid.Col>
        <Grid.Col span={12} md={4}>
          <Group position='right'>
            <Text>Количество товара: {props.quantity}</Text>
            <Group position='center'>
              <Button
                variant='gradient'
                onClick={() =>
                  setItemQuantity(props.productId, props.quantity + 1)
                }
              >
                <Plus />
              </Button>
              <Button variant='gradient' onClick={onMinusHandle}>
                <Minus />
              </Button>
            </Group>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
});
