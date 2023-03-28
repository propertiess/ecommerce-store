import { observer } from 'mobx-react-lite';

import { useOrderStore } from '@/store/order/Order';

import { OrderList } from './components/OrderList';

export const OrderScreen = observer(() => {
  const { order } = useOrderStore();

  return (
    <div>
      <OrderList order={order} />
    </div>
  );
});
