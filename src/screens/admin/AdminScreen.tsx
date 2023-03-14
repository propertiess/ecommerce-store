import { useState } from 'react';
import { Group, Select, Stack, Text } from '@mantine/core';

import { ProductsCrudTable } from '@/screens/admin/components/tables/ProductsCrudTable';
import { AvailableTable } from '@/types';

import { UsersCrudTable } from './components/tables/UsersCrudTable';

export const AdminScreen = () => {
  const [table, setTable] = useState<AvailableTable>('products');

  return (
    <Stack m='sm'>
      <Group>
        <Text>Таблица</Text>
        <Select
          defaultValue={table}
          data={[
            {
              value: 'products',
              label: 'Products'
            },
            {
              value: 'users',
              label: 'Users'
            }
          ]}
          onChange={value => setTable(value as AvailableTable)}
        />
      </Group>
      {table === 'products' && <ProductsCrudTable />}
      {table === 'users' && <UsersCrudTable />}
    </Stack>
  );
};
