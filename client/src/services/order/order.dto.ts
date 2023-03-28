import { TOrderItem } from '@/store/order/Order';

export type OrderDto = {
  userId: number;
  order: TOrderItem[];
};
