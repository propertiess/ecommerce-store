import { PropsWithChildren, useEffect } from 'react';
import { getCookie, hasCookie } from 'cookies-next';
import { observer } from 'mobx-react-lite';

import { Storage } from '@/utils/api/storage';
import { AuthEnum } from '@/utils/consts';

import { BasketProvider } from '../basket/BasketProvider';
import { LikedProvider } from '../liked/LikedProvider';

import { useAuthStore } from './Auth';

type Props = PropsWithChildren;

export const AuthProvider = observer(({ children }: Props) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (!hasCookie(AuthEnum.TOKEN)) {
      return;
    }

    const userId = +Storage.getItem('user-id')!;
    setUser(getCookie(AuthEnum.TOKEN) as string, userId);
  }, [setUser]);

  return (
    <>
      <BasketProvider>
        <LikedProvider>{children}</LikedProvider>
      </BasketProvider>
    </>
  );
});
