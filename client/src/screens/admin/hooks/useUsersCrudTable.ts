import { User } from '@/types';

import { useCrudTable } from './useCrudTable';
import { useGetUsers } from './useGetUsers';
import { useMutationUsers } from './useMutationUsers';

type UsersCrudTableProps = User | Omit<User, 'id'>;

export const useUsersCrudTable = () => {
  const {
    tableElement,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onSave,
    onDelete,
    close
  } = useCrudTable<UsersCrudTableProps>();

  const { data: users } = useGetUsers();
  const { mutatePost, mutatePut, mutateDelete } = useMutationUsers();

  const onUpdate = (updateUser: UsersCrudTableProps) => {
    mutatePut(updateUser as User);
  };

  const onPost = (postUser: UsersCrudTableProps) => {
    mutatePost(postUser);
  };

  return {
    users,
    choiceUser: tableElement,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onDelete: onDelete(id => {
      mutateDelete(id);
    }),
    onSave: onSave(onPost, onUpdate),
    close
  };
};
