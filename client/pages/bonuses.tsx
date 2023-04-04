import { Layout } from '@/layout';
import { BonusesScreen } from '@/screens/bonuses/BonusesScreen';
import { NextPageWithAuth } from '@/types';

const Bonuses: NextPageWithAuth = () => {
  return (
    <Layout
      title='Скидочные купоны'
      description='Скидочные купоны для всей вашей семьи!'
    >
      <BonusesScreen />
    </Layout>
  );
};

Bonuses.isOnlyUser = true;

export default Bonuses;
