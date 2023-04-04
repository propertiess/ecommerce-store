import { Grid } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';

import { CenteredLoader } from '@/components/CenteredLoader';
import { BonusService } from '@/services/bonus/bonus.service';
import { useAuthStore } from '@/store/auth/Auth';
import { useBasketStore } from '@/store/basket/Basket';

import { BonusCard } from './components/BonusCard';

export const BonusesScreen = observer(() => {
  const { userId } = useAuthStore();
  const { percentDiscount, setPercentDiscount } = useBasketStore();

  const { data: bonuses, isFetching } = useQuery({
    queryKey: ['bonuses'],
    queryFn: () => BonusService.getAll(),
    staleTime: Infinity
  });

  const onAddedBonus = (percent: number) => {
    setPercentDiscount(percent);
  };

  if (isFetching) {
    return <CenteredLoader />;
  }

  return (
    <Grid py='md'>
      {bonuses?.length &&
        bonuses.map(bonus => (
          <Grid.Col key={bonus.id} span={12} xs={6} sm={4} xl={2}>
            <BonusCard
              onAddedBonus={onAddedBonus}
              disabled={!!percentDiscount || !userId}
              {...bonus}
            />
          </Grid.Col>
        ))}
    </Grid>
  );
});
