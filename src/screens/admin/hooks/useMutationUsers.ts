import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'pages/_app';

import { UserService } from '@/services/user/user.service';
import { User } from '@/types';
import { QueryKeys } from '@/utils/consts';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/helpers/notifications';

export const useMutationUsers = () => {
  const { mutate: deleteUsers } = useMutation({
    mutationKey: [QueryKeys.users],
    mutationFn: (id: number) => UserService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.users]);
      showSuccessNotification('Данные удалены!');
    },
    onError: () => {
      showErrorNotification('Не удалось!');
    }
  });

  const { mutate: postUsers } = useMutation({
    mutationKey: [QueryKeys.users],
    mutationFn: (user: Omit<User, 'id'>) => UserService.post(user),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.users]);
      showSuccessNotification('Данные удалены!');
    },
    onError: () => {
      showErrorNotification('Не удалось!');
    }
  });

  const { mutate: putUsers } = useMutation({
    mutationKey: [QueryKeys.users],
    mutationFn: (user: User) => UserService.update(user),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.users]);
      showSuccessNotification('Данные удалены!');
    },
    onError: () => {
      showErrorNotification('Не удалось!');
    }
  });

  return {
    deleteUsers,
    postUsers,
    putUsers
  };
};
