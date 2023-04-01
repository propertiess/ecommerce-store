import { useGetProducts } from '@/screens/home/hooks/useGetProducts';
import { TBasketItem } from '@/store/basket/Basket';

import { BasketItemProps } from '../components/BasketItem';

export const useBasketList = (
  basket: TBasketItem[],
  percentDiscount: number
) => {
  const { data, isFetching } = useGetProducts();

  const { basketItems, totalPrice } = (basket || []).reduce(
    (
      acc: { basketItems: BasketItemProps[]; totalPrice: number },
      currentBasketItem
    ) => {
      if (!data) {
        return acc;
      }
      const product = data.find(
        product => product.id === currentBasketItem.productId
      )!;

      acc.basketItems.push({ ...product, ...currentBasketItem });
      acc.totalPrice += currentBasketItem.quantity * product.price;
      return acc;
    },
    { basketItems: [], totalPrice: 0 }
  );

  const totalPriceWithBonus = (totalPrice * percentDiscount) / 100;

  return {
    basketItems,
    totalPrice,
    totalPriceWithBonus,
    isFetching
  };
};
