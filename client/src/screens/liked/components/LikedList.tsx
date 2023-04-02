import { Center } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { CenteredLoader } from '@/components/CenteredLoader';
import { useLikedStore } from '@/store/liked/Liked';

import { useLikedList } from '../hooks/useLikedList';

import { LikedItem } from './LikedItem';

export const LikedList = observer(() => {
  const { liked, removeItem } = useLikedStore();
  const { likedItems, isFetching } = useLikedList(liked);

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
                removeItem={removeItem}
              />
            ))}
        </>
      ) : (
        <Center className='mt-3'>Товаров нет!</Center>
      )}
    </>
  );
});
