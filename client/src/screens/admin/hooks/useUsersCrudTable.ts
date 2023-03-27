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
  // const { postProducts, putProducts, deleteProducts } = useMutationProducts();
  const { deleteUsers, postUsers, putUsers } = useMutationUsers();

  const onUpdate = (updateUser: UsersCrudTableProps) => {
    // putProducts(updateProduct as Product);
    putUsers(updateUser as User);
  };

  const onPost = (postUser: UsersCrudTableProps) => {
    // postProducts(postProduct);
    postUsers(postUser);
  };

  return {
    users,
    choiceUser: tableElement,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onDelete: onDelete(id => {
      deleteUsers(id);
    }),
    onSave: onSave(onPost, onUpdate),
    close
  };
};
