import { Button, Group } from '@mantine/core';
import {
  HeartOff,
  HeartPlus,
  ShoppingCartOff,
  ShoppingCartPlus
} from 'tabler-icons-react';

import { GoodsCardPropsOften } from './GoodsCard';
import { PromptTooltipOnDisabled } from './PromptTooltip';

type Props = GoodsCardPropsOften & { id: number };

export const BasketAndLikedButtons = (props: Props) => {
  return (
    <PromptTooltipOnDisabled
      label='Для того чтобы добавить товар в корзину или избранное нужно зарегистрироваться!'
      disabled={props.disabled}
    >
      <Group>
        <Button
          variant='light'
          color={props.isInLiked ? 'red' : 'blue'}
          onClick={
            props.isInLiked
              ? () => props.onCancelLiked(props.id)
              : () => props.onAddedToLiked(props.id)
          }
          radius='md'
          disabled={props.disabled}
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
          disabled={props.disabled}
        >
          {props.isInBasket ? <ShoppingCartOff /> : <ShoppingCartPlus />}
        </Button>
      </Group>
    </PromptTooltipOnDisabled>
  );
};
