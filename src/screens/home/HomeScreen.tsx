import { Center, Grid, Loader, Text } from '@mantine/core';

import { Layout } from '@/layout';

import { ProductCard } from './components/product-card/ProductCard';
import { useGetProducts } from './hooks/useGetProducts';

export const HomeScreen = () => {
  const { data: products, isFetching, isError } = useGetProducts();

  if (isFetching) {
    return (
      <Layout title='Магазин' description='Магазин товаров'>
        <Center mt='md'>
          <Loader />
        </Center>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout title='Магазин' description='Магазин товаров'>
        <Center mt='md'>
          <Text weight={500}>Произошла непредвиденная ошибка!</Text>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout title='Магазин' description='Магазин товаров'>
      <Grid py='md'>
        {products?.map(product => (
          <Grid.Col key={product.id} span={12} xs={6} sm={4} xl={2}>
            <ProductCard product={product} />
          </Grid.Col>
        ))}
      </Grid>
    </Layout>
  );
};
