import { TBasketItem } from '@/store/basket/Basket';

export type BasketDto = {
  userId: number;
  basket: TBasketItem[];
};
