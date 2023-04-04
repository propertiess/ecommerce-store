import { Center } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { CenteredLoader } from '@/components/CenteredLoader';
import { useLikedStore } from '@/store/liked/Liked';

import { useLikedList } from '../hooks/useLikedList';

import { LikedItem } from './LikedItem';

export const LikedList = observer(() => {
  const { toggleLikedItem } = useLikedStore();
  const { liked, likedItems, isFetching } = useLikedList();

  if (isFetching) {
    return <CenteredLoader />;
  }

  return (
    <>
      {liked.length ? (
        <>
          {liked &&
            liked.map(({ productId }, idx) => (
              <LikedItem
                key={productId}
                {...likedItems[idx]}
                productId={productId}
                removeItem={toggleLikedItem}
              />
            ))}
        </>
      ) : (
        <Center className='mt-3'>Список товаров пуст</Center>
      )}
    </>
  );
});
