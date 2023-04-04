import { Button, Group, Tooltip } from '@mantine/core';
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
        <Tooltip
          label={
            props.isInLiked
              ? 'Убрать товар из избранного'
              : 'Добавить товар в избранное'
          }
          withinPortal={true}
        >
          <Button
            variant='light'
            color={props.isInLiked ? 'red' : 'blue'}
            onClick={() => props.toggleLikedItem({ productId: props.id })}
            radius='md'
            disabled={props.disabled}
          >
            {props.isInLiked ? <HeartOff /> : <HeartPlus />}
          </Button>
        </Tooltip>
        <Tooltip
          label={
            props.isInBasket
              ? 'Убрать товар из корзины'
              : 'Добавить товар в корзину'
          }
          withinPortal={true}
        >
          <Button
            variant='light'
            color={props.isInBasket ? 'red' : 'blue'}
            onClick={() =>
              props.toggleBasketItem({ productId: props.id, quantity: 1 })
            }
            radius='md'
            disabled={props.disabled}
          >
            {props.isInBasket ? <ShoppingCartOff /> : <ShoppingCartPlus />}
          </Button>
        </Tooltip>
      </Group>
    </PromptTooltipOnDisabled>
  );
};
