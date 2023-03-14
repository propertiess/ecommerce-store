import { Grid } from '@mantine/core';
import { HomePageProps } from 'pages';

import { ProductCard } from './components/product-card/ProductCard';

export const HomeScreen = ({ products }: Required<HomePageProps>) => {
  return (
    <Grid py='md'>
      {products.map(product => (
        <Grid.Col key={product.id} span={12} xs={6} sm={4} xl={2}>
          <ProductCard product={product} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
