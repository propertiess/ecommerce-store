import { Layout } from '@/layout';
import { LikedScreen } from '@/screens/liked/LikedScreen';
import { NextPageWithAuth } from '@/types';

const Liked: NextPageWithAuth = () => {
  return (
    <Layout title='Избранное'>
      <LikedScreen />
    </Layout>
  );
};

Liked.isOnlyUser = true;

export default Liked;
