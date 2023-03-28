import { Center, Loader } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { useGetProducts } from '@/screens/home/hooks/useGetProducts';
import { TOrderItem } from '@/store/order/Order';

import { OrderItem } from './OrderItem';

type Props = {
  order: TOrderItem[];
};

export const OrderList = observer(({ order }: Props) => {
  const { data, isFetching } = useGetProducts();

  if (isFetching) {
    return (
      <Center className='mt-3'>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      {order.length ? (
        order.map(item => (
          <OrderItem key={item.productId} item={item} products={data!} />
        ))
      ) : (
        <Center className='mt-3'>Товаров нет!</Center>
      )}
    </>
  );
});
