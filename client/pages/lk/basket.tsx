import { Layout } from '@/layout';
import { BasketScreen } from '@/screens/basket/BasketScreen';

const Basket = () => {
  return (
    <Layout title='Корзина'>
      <BasketScreen />
    </Layout>
  );
};

Basket.isOnlyUser = true;

export default Basket;
