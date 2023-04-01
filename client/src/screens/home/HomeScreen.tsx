import { Grid } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { HomePageProps } from 'pages';

import { TBasketItem, useBasketStore } from '@/store/basket/Basket';

import { ProductCard } from './components/product-card/ProductCard';

export const HomeScreen = observer(({ products }: Required<HomePageProps>) => {
  const { basket, addItem, removeItem } = useBasketStore();

  const onAdded = (id: number) => {
    const item: TBasketItem = {
      productId: id,
      quantity: 1
    };
    addItem(item);
  };

  const onCancel = (id: number) => {
    removeItem(id);
  };

  return (
    <Grid py='md'>
      {products.map(product => (
        <Grid.Col key={product.id} span={12} xs={6} sm={4} xl={2}>
          <ProductCard
            product={product}
            isAdded={!!basket.find(item => item.productId === product.id)}
            onAdded={onAdded}
            onCancel={onCancel}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
});
