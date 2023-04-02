import { Card, Center, Flex, Stack, Text } from '@mantine/core';
import Image from 'next/image';

import { Product } from '@/types';
import { convertCurrency } from '@/utils/helpers/convertCurrency';

import { BasketAndLikedButtons } from './BasketAndLikedButtons';
import { CutTooltip } from './CutTooltip';

export type GoodsCardProps = Product & {
  href?: string;
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
        {props.href ? (
          <CutTooltip
            title={props.title}
            length={maxLengthTitle}
            withTooltip={withToolTip}
            href={props.href}
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

      <Flex align='center' justify='space-between' mt='md'>
        <Text>{convertCurrency(props.price)}</Text>

        <BasketAndLikedButtons
          id={props.id}
          isInBasket={props.isInBasket}
          isInLiked={props.isInLiked}
          onAddedToBasket={props.onAddedToBasket}
          onCancelBasket={props.onCancelBasket}
          onAddedToLiked={props.onAddedToLiked}
          onCancelLiked={props.onCancelLiked}
          disabled={disabled}
        />
      </Flex>
    </Card>
  );
};
