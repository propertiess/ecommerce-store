import { useQuery } from '@tanstack/react-query';

import { UserDetailsService } from '@/services/user-details/user-details.service';
import { initialFieldsUserDetails, QueryKeys } from '@/utils/consts';
import { showErrorNotification } from '@/utils/helpers/notifications';

export const useGetDetails = () => {
  return useQuery({
    queryKey: [QueryKeys['users-details']],
    queryFn: () => UserDetailsService.getAll(),
    onError: () => {
      showErrorNotification('Не удалось получить информацию об аккаунтах');
    }
  });
};

export const useGetDetail = (id: number | null) => {
  return useQuery({
    queryKey: [QueryKeys['users-details'], id],
    enabled: id !== undefined ? true : false,
    queryFn: () => UserDetailsService.get(id!),
    onError: async () => {
      try {
        await UserDetailsService.post({
          ...initialFieldsUserDetails,
          userId: id!
        });
      } catch (e) {
        showErrorNotification('Не удалось получить информацию об аккаунте!');
        console.error(e);
      }
    }
  });
};
