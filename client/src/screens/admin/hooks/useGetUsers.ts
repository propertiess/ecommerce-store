import { useQuery } from '@tanstack/react-query';

import { UserService } from '@/services/user/user.service';
import { QueryKeys } from '@/utils/consts';
import { showErrorNotification } from '@/utils/helpers/notifications';

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QueryKeys.users],
    queryFn: () => UserService.getAll(),
    onError: () => {
      showErrorNotification('Не удалось получить данные');
    }
  });
};
