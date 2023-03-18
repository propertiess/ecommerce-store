import { useDisclosure } from '@mantine/hooks';

import { GoodsCard } from '@/components/GoodsCard';

import { Car } from '../types';

type Props = {
  car: Car;
};

export const CarCard = ({ car }: Props) => {
  const [added, { toggle }] = useDisclosure(false);

  return (
    <GoodsCard goods={car} added={added} onAdded={toggle} onCancel={toggle} />
  );
};
