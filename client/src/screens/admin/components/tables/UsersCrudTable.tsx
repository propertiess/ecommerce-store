import { useUsersCrudTable } from '../../hooks/useUsersCrudTable';
import { CrudDrawer } from '../CrudDrawer';
import { CrudTable } from '../CrudTable';
import { UsersCrudForm } from '../forms/UsersCrudForm';

export const UsersCrudTable = () => {
  const {
    users,
    choiceUser,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onSave,
    onDelete,
    close
  } = useUsersCrudTable();

  return (
    <>
      <CrudTable
        name='users'
        data={users!}
        turnOnPostEditing={addRow}
        onEdit={user => changeRow(user)}
        onDelete={id => onDelete(id)}
      />
      <CrudDrawer
        isOpen={isDrawerOpen}
        operation={operation}
        crudForm={<UsersCrudForm user={choiceUser} onSave={onSave} />}
        close={close}
      />
    </>
  );
};
