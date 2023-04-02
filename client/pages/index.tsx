import { CenteredLoader } from '@/components/CenteredLoader';
import { Layout } from '@/layout';
import { HomeScreen } from '@/screens/home';
import { useGetProducts } from '@/screens/home/hooks/useGetProducts';
import { Product } from '@/types';

export type HomePageProps = {
  products?: Product[];
};

const Home = () => {
  const { data, isFetching } = useGetProducts();

  return (
    <Layout title='Магазин' description='Магазин товаров'>
      {!isFetching ? (
        <>{data && <HomeScreen products={data} />}</>
      ) : (
        <CenteredLoader />
      )}
    </Layout>
  );
};

export default Home;
