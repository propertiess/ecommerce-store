import { makeAutoObservable } from 'mobx';

import { OrderDto } from '@/services/order/order.dto';
import { OrderService } from '@/services/order/order.service';
import { Storage } from '@/utils/api/storage';

export type TOrderItem = {
  status: string;
  totalPrice: number;
};

class Order {
  order: TOrderItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem = async (item: TOrderItem): Promise<boolean> => {
    this.order.push(item);
    const result = await this.mutateOrder(this.order);

    if (result) {
      return result;
    }

    this.order.pop();
    return false;
  };

  setOrder = (order: TOrderItem[]) => {
    this.order = order;
  };

  private mutateOrder = async (order: TOrderItem[]): Promise<boolean> => {
    const userId = Storage.getItem<string>('user-id');

    if (!userId) {
      return false;
    }

    const orderDto: OrderDto = {
      userId: +userId,
      order
    };

    try {
      await OrderService.put(orderDto);
      // showSuccessNotification('Заказ успешно оформлен!');
      return true;
    } catch (e) {
      console.error(e);
      try {
        await OrderService.post(orderDto);
        // showSuccessNotification('Заказ успешно оформлен!');
        return true;
      } catch (e) {
        console.error(e);
        // showErrorNotification('Не удалось оформить заказ!');
        return false;
      }
    }
  };
}

const store = new Order();

export const useOrderStore = () => store;
