import { GoodsCardPropsOften } from '@/components/GoodsCard';
import { useAuthStore } from '@/store/auth/Auth';
import { useBasketStore } from '@/store/basket/Basket';
import { useLikedStore } from '@/store/liked/Liked';

export const useBasketAndLikedMethods = (): Omit<
  GoodsCardPropsOften,
  'isInBasket' | 'isInLiked'
> => {
  const { userId } = useAuthStore();

  const { addItem: addItemToBasket, removeItem: removeItemFromBasket } =
    useBasketStore();
  const { addItem: addItemToLiked, removeItem: removeItemFromLiked } =
    useLikedStore();

  return {
    onAddedToBasket: id => addItemToBasket({ productId: id, quantity: 1 }),
    onAddedToLiked: id => addItemToLiked({ productId: id }),
    onCancelBasket: id => removeItemFromBasket(id),
    onCancelLiked: id => removeItemFromLiked(id),
    disabled: !userId
  };
};
