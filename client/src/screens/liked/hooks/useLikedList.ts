import { useGetProducts } from '@/screens/home/hooks/useGetProducts';
import { useLikedStore } from '@/store/liked/Liked';

import { LikedItemProps } from '../components/LikedItem';

export const useLikedList = () => {
  const { liked } = useLikedStore();
  const { data, isFetching } = useGetProducts();

  const likedItems = (liked || []).reduce(
    (acc: Omit<LikedItemProps, 'removeItem'>[], currentLikedItem) => {
      if (!data) {
        return acc;
      }
      const product = data.find(
        product => product.id === currentLikedItem.productId
      )!;

      acc.push({ ...product, ...currentLikedItem });
      return acc;
    },
    []
  );

  return {
    liked,
    likedItems,
    isFetching
  };
};
