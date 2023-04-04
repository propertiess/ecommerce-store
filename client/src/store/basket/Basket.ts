import { makeAutoObservable } from 'mobx';

import { BasketDto } from '@/services/basket/basket.dto';
import { BasketService } from '@/services/basket/basket.service';
import { Storage } from '@/utils/api/storage';

export type TBasketItem = {
  productId: number;
  quantity: number;
};

class Basket {
  basket: TBasketItem[] = [];
  percentDiscount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  toggleBasketItem = (item: TBasketItem) => {
    const index = this.basket.findIndex(
      basketItem => basketItem.productId === item.productId
    );

    if (index === -1) {
      this.basket.push(item);
      this.mutateBasket(this.basket);
      return;
    }

    this.basket.splice(index, 1);
    this.mutateBasket(this.basket);
  };

  setItemQuantity = (productId: number, quantity: number) => {
    const index = this.basket.findIndex(item => item.productId === productId);
    this.basket[index].quantity = quantity;
    this.mutateBasket(this.basket);
  };

  clearBasket = () => {
    this.basket = [];
    this.mutateBasket(this.basket);
  };

  setBasket = (basket: TBasketItem[]) => {
    this.basket = basket;
  };

  setPercentDiscount = (percentDiscount: number) => {
    this.percentDiscount = percentDiscount;
    Storage.setItem('percent-discount', percentDiscount);
  };

  private mutateBasket = async (basket: TBasketItem[]) => {
    const userId = Storage.getItem<string>('user-id');

    if (!userId) {
      return;
    }

    const basketDto: BasketDto = {
      userId: +userId,
      basket
    };

    try {
      await BasketService.put(basketDto);
    } catch (e) {
      console.error(e);
      try {
        await BasketService.post(basketDto);
      } catch (e) {
        console.error(e);
      }
    }
  };
}

const store = new Basket();

export const useBasketStore = () => store;
