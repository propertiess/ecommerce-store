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
    const result: string[] = [];
    if (!data?.[0]) {
      return result;
    }

    for (const key in data[0]) {
      if (typeof data[0][key] === 'object') {
        continue;
      }
      result.push(key);
    }
    return result;
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
