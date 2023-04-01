import { observer } from 'mobx-react-lite';

import { useBasketStore } from '@/store/basket/Basket';

import { BasketList } from './components/BasketList';

export const BasketScreen = observer(() => {
  const { basket } = useBasketStore();

  return (
    <div>
      <BasketList basket={basket} />
    </div>
  );
});
