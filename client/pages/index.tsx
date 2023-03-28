import { Text, Loader } from '@mantine/core';

import { Layout } from '@/layout';
import { HomeScreen } from '@/screens/home';
import { ProductService } from '@/services/product/product.service';
import { Product } from '@/types';
import { useGetProducts } from '@/screens/home/hooks/useGetProducts';

export type HomePageProps = {
  products?: Product[];
};

const Home = () => {
  const { data, isFetching } = useGetProducts();

  return (
    <Layout title='Магазин' description='Магазин товаров'>
      {!isFetching ? <>{data && <HomeScreen products={data} />}</> : <Loader />}
    </Layout>
  );
};

export default Home;
