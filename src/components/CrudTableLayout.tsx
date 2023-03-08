import { useState } from 'react';
import { Drawer, Group, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import { CrudForm } from '@/screens/admin/components/CrudForm';

type Props<T extends { id: number }> = {
  headers: (keyof T)[];
  bodies?: T[];
  onEdit?: (id: number, updateElement: T) => void;
  onRemove?: (id: number) => void;
};

export const CrudTableLayout = <T extends { id: number }>({
  headers,
  bodies,
  onEdit,
  onRemove
}: Props<T>) => {
  const [opened, { close, open }] = useDisclosure(false);
  const [changedBody, setChangedBody] = useState<T | null>(null);

  const changeRow = (body: T) => {
    setChangedBody(body);
    open();
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            {headers.map(el => (
              <th key={el as string}>{el as string}</th>
            ))}
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {bodies?.map(body => (
            <tr key={body.id}>
              {headers.map(el => (
                <td key={el as string}>{body[el] as string}</td>
              ))}
              <td>
                <Group>
                  <IconEdit
                    className='cursor-pointer'
                    onClick={() => changeRow(body)}
                  />
                  <IconTrash
                    className='cursor-pointer'
                    onClick={() => onRemove?.(body.id)}
                  />
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Drawer
        opened={opened}
        onClose={close}
        zIndex={1002}
        title='Создание новой строки'
        position='right'
      >
        <CrudForm
          labels={headers}
          body={changedBody!}
          onSave={changedBody => {
            onEdit?.(changedBody.id, changedBody);
          }}
          onCancel={close}
        />
      </Drawer>
    </>
  );
};
