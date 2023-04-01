import { useRouter } from 'next/router';

import { useAuthStore } from '@/store/auth/Auth';

export const useAuthReset = () => {
  const { removeUser } = useAuthStore();
  const router = useRouter();

  const onResetAuth = () => {
    removeUser();
    router.replace('/authorization');
  };

  return onResetAuth;
};
