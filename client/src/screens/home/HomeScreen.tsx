import { Grid } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { HomePageProps } from 'pages';

import { useAuthStore } from '@/store/auth/Auth';
import { TBasketItem, useBasketStore } from '@/store/basket/Basket';
import { useLikedStore } from '@/store/liked/Liked';

import { ProductCard } from './components/ProductCard';

export const HomeScreen = observer(({ products }: Required<HomePageProps>) => {
  const { userId } = useAuthStore();
  const {
    basket,
    addItem: addItemToBasket,
    removeItem: removeItemBasket
  } = useBasketStore();
  const {
    liked,
    addItem: addItemToLiked,
    removeItem: removeItemLiked
  } = useLikedStore();

  const onAddedToBasket = (id: number) => {
    const item: TBasketItem = {
      productId: id,
      quantity: 1
    };
    addItemToBasket(item);
  };

  return (
    <Grid py='md'>
      {products.map(product => (
        <Grid.Col key={product.id} span={12} xs={6} sm={4} xl={2}>
          <ProductCard
            product={product}
            isInBasket={!!basket.find(item => item.productId === product.id)}
            isInLiked={!!liked.find(item => item.productId === product.id)}
            onAddedToLiked={id => addItemToLiked({ productId: id })}
            onAddedToBasket={onAddedToBasket}
            onCancelBasket={removeItemBasket}
            onCancelLiked={removeItemLiked}
            disabled={!userId}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
});
