import { Text } from '@mantine/core';
import { GetStaticProps } from 'next';

import { Layout } from '@/layout';
import { HomeScreen } from '@/screens/home';
import { ProductService } from '@/services/product/product.service';
import { Product } from '@/types';

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const products = await ProductService.getAll();

    return {
      props: {
        products
      },
      revalidate: 60
    };
  } catch (e) {
    return {
      props: {},
      revalidate: 60
    };
  }
};

export type HomePageProps = {
  products?: Product[];
};

const Home = ({ products }: HomePageProps) => {
  return (
    <Layout title='Магазин' description='Магазин товаров'>
      {products ? (
        <HomeScreen products={products} />
      ) : (
        <Text weight={500}>Произошла непредвиденная ошибка</Text>
      )}
    </Layout>
  );
};

export default Home;
