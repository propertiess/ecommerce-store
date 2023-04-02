import { makeAutoObservable } from 'mobx';

import { OrderDto } from '@/services/order/order.dto';
import { OrderService } from '@/services/order/order.service';
import { Storage } from '@/utils/api/storage';

export type TOrderItem = {
  id: number;
  status: string;
  totalPrice: number;
};

class Order {
  order: TOrderItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem = (item: TOrderItem) => {
    this.order.push(item);
    this.mutateOrder(this.order);
  };

  setOrder = (order: TOrderItem[]) => {
    this.order = order;
  };

  private mutateOrder = async (order: TOrderItem[]) => {
    const userId = Storage.getItem<string>('user-id');

    if (!userId) {
      return;
    }

    const orderDto: OrderDto = {
      userId: +userId,
      order
    };

    try {
      await OrderService.put(orderDto);
    } catch (e) {
      console.error(e);
      try {
        await OrderService.post(orderDto);
      } catch (e) {
        console.error(e);
      }
    }
  };
}

const store = new Order();

export const useOrderStore = () => store;
