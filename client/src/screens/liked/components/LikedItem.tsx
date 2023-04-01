import { Button, Flex, Group, Paper, Stack, Text } from '@mantine/core';
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
        <Group position='center'>
          <Button
            variant='gradient'
            onClick={() => props.removeItem(props.productId)}
          >
            <Minus />
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
