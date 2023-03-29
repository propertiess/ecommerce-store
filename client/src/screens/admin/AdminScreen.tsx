import { useState } from 'react';
import { Group, Select, Stack, Text } from '@mantine/core';

import { ProductsCrudTable } from '@/screens/admin/components/tables/ProductsCrudTable';
import { AvailableTable } from '@/types';
import { QueryKeys } from '@/utils/consts';
import { upperFirstChar } from '@/utils/helpers/upperFirstChar';

import { UsersCrudTable } from './components/tables/UsersCrudTable';

const selectData = Object.keys(QueryKeys).map(key => ({
  value: key,
  label: upperFirstChar(key)
}));

export const AdminScreen = () => {
  const [table, setTable] = useState<AvailableTable>(QueryKeys.products);

  return (
    <Stack m='sm'>
      <Group>
        <Text>Таблица</Text>
        <Select
          defaultValue={table}
          data={selectData}
          onChange={value => setTable(value as AvailableTable)}
        />
      </Group>
      {table === QueryKeys.products && <ProductsCrudTable />}
      {table === QueryKeys.users && <UsersCrudTable />}
    </Stack>
  );
};
