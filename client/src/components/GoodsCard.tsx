import { Card, Center, Group, Rating, Stack, Text } from '@mantine/core';
import Image from 'next/image';

import { TBasketItem } from '@/store/basket/Basket';
import { TLikedItem } from '@/store/liked/Liked';
import { Product } from '@/types';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

import { A } from './A';
import { BasketAndLikedButtons } from './BasketAndLikedButtons';
import { CutTooltip } from './CutTooltip';

export type GoodsCardProps = Product & {
  href?: string;
  withToolTip?: boolean;
  maxLengthTitle?: number;
  isInBasket: boolean;
  isInLiked: boolean;
  toggleBasketItem: (item: TBasketItem) => void;
  toggleLikedItem: (item: TLikedItem) => void;
  disabled?: boolean;
};

export type GoodsCardPropsOften = Pick<
  GoodsCardProps,
  | 'isInBasket'
  | 'isInLiked'
  | 'toggleBasketItem'
  | 'toggleLikedItem'
  | 'disabled'
  | 'href'
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
          {props.href ? (
            <A href={props.href} className='relative mx-auto h-52 w-52'>
              <Image
                className='object-contain'
                sizes='100%'
                src={props.img}
                alt={props.title}
                fill={true}
                priority={props.id < 4}
              />
            </A>
          ) : (
            <Image
              className='object-contain'
              sizes='100%'
              src={props.img}
              alt={props.title}
              fill={true}
              priority={props.id < 4}
            />
          )}
        </Stack>
      </Card.Section>
      <Center mt='md'>
        {props.href ? (
          <CutTooltip
            title={props.title}
            length={maxLengthTitle}
            withTooltip={withToolTip}
            href={props.href}
            withinPortal={true}
            as='a'
          />
        ) : (
          <CutTooltip
            title={props.title}
            length={maxLengthTitle}
            withTooltip={withToolTip}
          />
        )}
      </Center>

      <Stack
        mt='md'
        className='flex flex-row flex-wrap items-center justify-between gap-2'
      >
        {props.rating && <Rating value={props.rating} readOnly={true} />}
        <Text>{convertCurrency(props.price)}</Text>
      </Stack>
      <Group mt='md' position='right'>
        <BasketAndLikedButtons
          id={props.id}
          isInBasket={props.isInBasket}
          isInLiked={props.isInLiked}
          toggleBasketItem={props.toggleBasketItem}
          toggleLikedItem={props.toggleLikedItem}
          disabled={disabled}
        />
      </Group>
    </Card>
  );
};
