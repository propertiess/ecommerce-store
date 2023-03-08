import { useState } from 'react';
import { Group, Select, Stack, Text } from '@mantine/core';

import { Layout } from '@/layout';
import { ProductsCrudTable } from '@/screens/admin/components/tables/ProductsCrudTable';
import { AvailableTable } from '@/types';

// const mockUsers = [
//   {
//     id: 1,
//     username: 'johnd',
//     password: 'm38rmF$'
//   }
// ];

export const AdminScreen = () => {
  const [table, setTable] = useState<AvailableTable>('products');

  return (
    <Layout title='Администрирование'>
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
            onChange={value => setTable(value as 'users' | 'products')}
          />
        </Group>
        {table === 'products' && <ProductsCrudTable />}
      </Stack>
    </Layout>
  );
};
