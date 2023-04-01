import { Grid } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { BonusesPageProps } from 'pages/bonuses';

import { useAuthStore } from '@/store/auth/Auth';
import { useBasketStore } from '@/store/basket/Basket';

import { BonusCard } from './components/BonusCard';

export const BonusesScreen = observer(({ bonuses }: BonusesPageProps) => {
  const { userId } = useAuthStore();
  const { percentDiscount, setPercentDiscount } = useBasketStore();

  const onAddedBonus = (percent: number) => {
    setPercentDiscount(percent);
  };

  return (
    <Grid py='md'>
      {bonuses.map(bonus => (
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
