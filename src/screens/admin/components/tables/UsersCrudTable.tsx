import { Button, Drawer, Group, Table } from '@mantine/core';

import { GroupOperationButtons } from '@/components/GroupOperationButtons';
import { User } from '@/types';

import { useUsersCrudTable } from '../../hooks/useUsersCrudTable';
import { UsersCrudForm } from '../forms/UsersCrudForm';

const userKeys: (keyof User)[] = ['id', 'username', 'password', 'roles'];

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
      <Group position='right'>
        <Button
          className='ml-auto mt-2 block'
          variant='gradient'
          onClick={addRow}
        >
          Добавить новую строку в таблицу: users
        </Button>
      </Group>
      <Table>
        <thead>
          <tr>
            {userKeys.map(key => (
              <th key={key}>{key}</th>
            ))}
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id}>
              {userKeys.map(key => (
                <td key={key}>{user[key]}</td>
              ))}
              <td>
                <GroupOperationButtons
                  onEdit={() => changeRow(user)}
                  onDelete={() => onDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Drawer
        opened={isDrawerOpen}
        onClose={close}
        zIndex={1002}
        title={
          operation === 'post' ? 'Создание новой строки' : 'Изменение строки'
        }
        position='right'
      >
        <UsersCrudForm user={choiceUser} onSave={onSave} />
      </Drawer>
    </>
  );
};
