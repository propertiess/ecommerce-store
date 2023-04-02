import { Grid } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { HomePageProps } from 'pages';

import { useBasketAndLikedMethods } from '@/hooks/useBasketAndLiked';
import { useBasketStore } from '@/store/basket/Basket';
import { useLikedStore } from '@/store/liked/Liked';

import { ProductCard } from './components/ProductCard';

export const HomeScreen = observer(({ products }: Required<HomePageProps>) => {
  const { basket } = useBasketStore();
  const { liked } = useLikedStore();
  const basketAndLikedMethods = useBasketAndLikedMethods();

  return (
    <Grid py='md'>
      {products.map(product => (
        <Grid.Col key={product.id} span={12} xs={6} sm={4} lg={3}>
          <ProductCard
            product={product}
            href={`/products/${product.id}`}
            isInBasket={!!basket.find(item => item.productId === product.id)}
            isInLiked={!!liked.find(item => item.productId === product.id)}
            {...basketAndLikedMethods}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
});
