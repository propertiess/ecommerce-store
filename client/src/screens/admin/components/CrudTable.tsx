import { useMemo } from 'react';
import { Button, Group, Table } from '@mantine/core';

import { GroupOperationButtons } from '@/components/GroupOperationButtons';

type Props<T> = {
  name: string;
  data: T[];
  turnOnPostEditing: () => void;
  onEdit: (singleData: T) => void;
  onDelete: (id: number) => void;
};

export const CrudTable = <T extends { id: number }>({
  name,
  data,
  turnOnPostEditing,
  onEdit,
  onDelete
}: Props<T>) => {
  const keys = useMemo(() => {
    return Object.keys(data?.[0] ?? {});
  }, [data]);

  return (
    <>
      <Group position='right'>
        <Button
          className='ml-auto mt-2 block'
          variant='gradient'
          onClick={turnOnPostEditing}
        >
          Добавить новую строку в таблицу: {name}
        </Button>
      </Group>
      <Table>
        <thead>
          <tr>
            {keys.map(key => (
              <th key={key}>{key}</th>
            ))}
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(rowData => (
            <tr key={rowData.id}>
              {keys.map(key => (
                <td key={key}>{rowData[key as keyof T as 'id']}</td>
              ))}
              <td>
                <GroupOperationButtons
                  onEdit={() => onEdit(rowData)}
                  onDelete={() => onDelete(rowData.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
