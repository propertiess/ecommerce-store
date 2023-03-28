import { PropsWithChildren, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { OrderService } from '@/services/order/order.service';
import { Storage } from '@/utils/api/storage';

import { useOrderStore } from './Order';

type Props = PropsWithChildren;

export const OrderProvider = observer(({ children }: Props) => {
  const { setOrder } = useOrderStore();

  useEffect(() => {
    const userId = Storage.getItem('user-id');

    if (!userId) {
      return;
    }

    const fetch = async () => {
      try {
        const orderDto = await OrderService.getByUserId(+userId);
        setOrder(orderDto.order);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
});
