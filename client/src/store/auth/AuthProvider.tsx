import { PropsWithChildren, useEffect } from 'react';
import { getCookie, hasCookie } from 'cookies-next';
import { observer } from 'mobx-react-lite';
import NotFound from 'pages/404';

import { TypeComponentAuthFields } from '@/types';
import { Storage } from '@/utils/api/storage';
import { AuthEnum } from '@/utils/consts';

import { BasketProvider } from '../basket/BasketProvider';
import { LikedProvider } from '../liked/LikedProvider';
import { OrderProvider } from '../order/OrderProvider';

import { useAuthStore } from './Auth';

type Props = PropsWithChildren & TypeComponentAuthFields;

export const AuthProvider = observer(
  ({ children, Component: { isOnlyUser } }: Props) => {
    const { setUser, userId } = useAuthStore();

    useEffect(() => {
      if (!hasCookie(AuthEnum.TOKEN)) {
        return;
      }

      const userId = +Storage.getItem('user-id')!;
      setUser(getCookie(AuthEnum.TOKEN) as string, userId);
    }, [setUser]);

    if (isOnlyUser && !userId) {
      return (
        <NotFound title='Страница доступна зарегистрированным пользователям.' />
      );
    }

    return (
      <>
        <OrderProvider>
          <BasketProvider>
            <LikedProvider>{children}</LikedProvider>
          </BasketProvider>
        </OrderProvider>
      </>
    );
  }
);
