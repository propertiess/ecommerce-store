import { GetStaticProps } from 'next';

import { Layout } from '@/layout';
import { BonusesScreen } from '@/screens/bonuses/BonusesScreen';
import { Bonus } from '@/screens/bonuses/types';
import { BonusService } from '@/services/bonus/bonus.service';

export type BonusesPageProps = {
  bonuses: Bonus[];
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const bonuses = await BonusService.getAll();

    return {
      props: {
        bonuses
      },
      revalidate: 60
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
};

const Bonuses = ({ bonuses }: BonusesPageProps) => {
  return (
    <Layout
      title='Скидочные купоны'
      description='Скидочные купоны для всей вашей семьи!'
    >
      <BonusesScreen bonuses={bonuses} />
    </Layout>
  );
};

export default Bonuses;
