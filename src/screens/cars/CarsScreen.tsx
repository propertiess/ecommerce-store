import { Grid } from '@mantine/core';
import { CarsPageProps } from 'pages/cars';

import { CarCard } from './components/CarCard';

export const CarsScreen = ({ cars }: CarsPageProps) => {
  return (
    <Grid py='md'>
      {cars.map(car => (
        <Grid.Col key={car.id} span={12} xs={6} sm={4} xl={2}>
          <CarCard key={car.id} car={car} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
