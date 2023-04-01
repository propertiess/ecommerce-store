import { PropsWithChildren, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { LikedService } from '@/services/liked/liked.service';

import { useAuthStore } from '../auth/Auth';

import { useLikedStore } from './Liked';

type Props = PropsWithChildren;

export const LikedProvider = observer(({ children }: Props) => {
  const { setLiked, liked } = useLikedStore();
  const { userId } = useAuthStore();

  useEffect(() => {
    if (!userId) {
      liked.length && setLiked([]);
      return;
    }

    const fetch = async () => {
      try {
        const likedDto = await LikedService.get(userId);
        setLiked(likedDto.liked);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return <>{children}</>;
});
