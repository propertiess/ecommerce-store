import { PropsWithChildren, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { OrderService } from '@/services/order/order.service';

import { useAuthStore } from '../auth/Auth';

import { useOrderStore } from './Order';

type Props = PropsWithChildren;

export const OrderProvider = observer(({ children }: Props) => {
  const { order, setOrder } = useOrderStore();
  const { userId } = useAuthStore();

  useEffect(() => {
    if (!userId) {
      order.length && setOrder([]);
      return;
    }

    const fetch = async () => {
      try {
        const orderDto = await OrderService.get(userId);
        setOrder(orderDto.order);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return <>{children}</>;
});
