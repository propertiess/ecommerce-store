import { useGetProducts } from '@/screens/home/hooks/useGetProducts';
import { useBasketStore } from '@/store/basket/Basket';

import { BasketItemProps } from '../components/BasketItem';

export const useBasketList = () => {
  const { basket, percentDiscount } = useBasketStore();
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

  const totalPriceWithBonus = percentDiscount
    ? (totalPrice * percentDiscount) / 100
    : totalPrice;

  return {
    basket,
    percentDiscount,
    basketItems,
    totalPrice,
    totalPriceWithBonus,
    isFetching
  };
};
