import { PropsWithChildren, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { BasketService } from '@/services/basket/basket.service';
import { Storage } from '@/utils/api/storage';

import { useAuthStore } from '../auth/Auth';

import { useBasketStore } from './Basket';

type Props = PropsWithChildren;

export const BasketProvider = observer(({ children }: Props) => {
  const { setBasket, basket, setPercentDiscount } = useBasketStore();
  const { userId } = useAuthStore();

  useEffect(() => {
    if (!userId) {
      basket.length && setBasket([]);
      return;
    }

    const percentDiscount = Storage.getItem<number>('percent-discount') ?? 0;
    setPercentDiscount(percentDiscount);

    const fetch = async () => {
      try {
        const basketDto = await BasketService.get(userId);
        setBasket(basketDto.basket);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return <>{children}</>;
});
