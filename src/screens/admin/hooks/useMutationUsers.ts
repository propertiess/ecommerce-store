import { useMutation } from '@tanstack/react-query';

import { UserService } from '@/services/user/user.service';
import { User } from '@/types';
import { QueryKeys } from '@/utils/consts';
import { mutationOnSuccessOnError } from '@/utils/helpers/mutationOnSuccessOnError';

export const useMutationUsers = () => {
  const { mutate: deleteUsers } = useMutation({
    mutationFn: (id: number) => UserService.delete(id),
    ...mutationOnSuccessOnError([QueryKeys.users], 'delete')
  });

  const { mutate: postUsers } = useMutation({
    mutationFn: (user: Omit<User, 'id'>) => UserService.post(user),
    ...mutationOnSuccessOnError([QueryKeys.users], 'post')
  });

  const { mutate: putUsers } = useMutation({
    mutationFn: (user: User) => UserService.update(user),
    ...mutationOnSuccessOnError([QueryKeys.users], 'put')
  });

  return {
    deleteUsers,
    postUsers,
    putUsers
  };
};
