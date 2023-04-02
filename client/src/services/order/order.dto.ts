import { TOrderItem } from '@/store/order/Order';

import { LikedDto } from '../liked/liked.dto';

export type OrderDto = Pick<LikedDto, 'userId'> & {
  order: TOrderItem[];
};
