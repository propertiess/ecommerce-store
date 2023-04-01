import {
  Button,
  Card,
  Center,
  Group,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import Image from 'next/image';
import {
  HeartOff,
  HeartPlus,
  ShoppingCartOff,
  ShoppingCartPlus
} from 'tabler-icons-react';

import { Product } from '@/types';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

export type GoodsCardProps = Product & {
  withToolTip?: boolean;
  maxLengthTitle?: number;
  isInBasket: boolean;
  isInLiked: boolean;
  onAddedToBasket: (id: number) => void;
  onCancelBasket: (id: number) => void;
  onAddedToLiked: (id: number) => void;
  onCancelLiked: (id: number) => void;
  disabled?: boolean;
};

export type GoodsCardPropsOften = Pick<
  GoodsCardProps,
  | 'isInBasket'
  | 'isInLiked'
  | 'onAddedToBasket'
  | 'onAddedToLiked'
  | 'onCancelBasket'
  | 'onCancelLiked'
  | 'disabled'
>;

export const GoodsCard = ({
  maxLengthTitle = 20,
  withToolTip = false,
  disabled = false,
  ...props
}: GoodsCardProps) => {
  return (
    <Card withBorder h='100%'>
      <Card.Section pt='sm'>
        <Stack className='relative mx-auto h-52'>
          <Image
            className='object-contain'
            sizes='100%'
            src={props.img}
            alt={props.title}
            fill={true}
          />
        </Stack>
      </Card.Section>
      <Center mt='md'>
        {withToolTip && props.title.length > maxLengthTitle ? (
          <Tooltip label={props.title}>
            <Text weight={500}>
              {props.title.slice(0, maxLengthTitle) + '...'}
            </Text>
          </Tooltip>
        ) : (
          <Text weight={500}>{props.title}</Text>
        )}
      </Center>
      <Group grow align='center' mt='md'>
        <Text>{convertCurrency(props.price)}</Text>
        <Button
          variant='light'
          color={props.isInLiked ? 'red' : 'blue'}
          onClick={
            props.isInLiked
              ? () => props.onCancelLiked(props.id)
              : () => props.onAddedToLiked(props.id)
          }
          radius='md'
          disabled={disabled}
        >
          {props.isInLiked ? <HeartOff /> : <HeartPlus />}
        </Button>
        <Button
          variant='light'
          color={props.isInBasket ? 'red' : 'blue'}
          onClick={
            props.isInBasket
              ? () => props.onCancelBasket(props.id)
              : () => props.onAddedToBasket(props.id)
          }
          radius='md'
          disabled={disabled}
        >
          {props.isInBasket ? <ShoppingCartOff /> : <ShoppingCartPlus />}
        </Button>
      </Group>
    </Card>
  );
};
