import { GoodsCardPropsOften } from '@/components/GoodsCard';
import { useAuthStore } from '@/store/auth/Auth';
import { useBasketStore } from '@/store/basket/Basket';
import { useLikedStore } from '@/store/liked/Liked';

export const useBasketAndLikedMethods = (): Omit<
  GoodsCardPropsOften,
  'isInBasket' | 'isInLiked'
> => {
  const { userId } = useAuthStore();

  const { toggleBasketItem } = useBasketStore();
  const { toggleLikedItem } = useLikedStore();

  return {
    toggleBasketItem,
    toggleLikedItem,
    disabled: !userId
  };
};
