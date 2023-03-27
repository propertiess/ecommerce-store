import { PropsWithChildren, useEffect } from 'react';
import { getCookie, hasCookie } from 'cookies-next';
import { observer } from 'mobx-react-lite';

import { AuthEnum } from '@/utils/consts';

import { useAuthStore } from './Auth';

type Props = PropsWithChildren;

export const AuthProvider = observer(({ children }: Props) => {
  const { setAuthToken } = useAuthStore();

  useEffect(() => {
    hasCookie(AuthEnum.TOKEN) &&
      setAuthToken(getCookie(AuthEnum.TOKEN) as string);
  }, [setAuthToken]);

  return <>{children}</>;
});
