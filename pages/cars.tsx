import { GetStaticProps } from 'next';

import { Layout } from '@/layout';
import { CarsScreen } from '@/screens/cars/CarsScreen';
import { Car } from '@/screens/cars/types';
import { CarService } from '@/services/car/car.service';

export type CarsPageProps = {
  cars: Car[];
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const cars = await CarService.getAll();
    return {
      props: {
        cars
      },
      revalidate: 60
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
};

const Cars = ({ cars }: CarsPageProps) => {
  return (
    <Layout title='Машины' description='Машины на любой вкус и цвет'>
      <CarsScreen cars={cars} />
    </Layout>
  );
};

export default Cars;
