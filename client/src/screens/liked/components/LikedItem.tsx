import { Button, Flex, Grid, Group, Paper, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { Minus } from 'tabler-icons-react';

import { TLikedItem } from '@/store/liked/Liked';
import { Product } from '@/types';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

export type LikedItemProps = Omit<Product, 'id'> &
  TLikedItem & {
    removeItem: (id: number) => void;
  };

export const LikedItem = (props: LikedItemProps) => {
  return (
    <Paper className='mt-5 flex items-center justify-between' p='md' withBorder>
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
          <Text weight={500}>{props.title}</Text>
          <Text>{props.description}</Text>
          <Text>{convertCurrency(props.price)}</Text>
        </Grid.Col>
        <Grid.Col span={12} md={4} className='self-center'>
          <Group position='right'>
            <Button
              variant='gradient'
              onClick={() => props.removeItem(props.productId)}
            >
              <Minus />
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      <Flex></Flex>
      <Stack></Stack>
    </Paper>
  );
};
