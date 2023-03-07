import { useState } from 'react';
import { Button, Group, Modal, Select, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { CrudTableLayout } from '@/components/CrudTableLayout';
import { Layout } from '@/layout';
import { CrudForm } from '@/screens/admin/components/CrudForm';
import { Product } from '@/types';

import {
  useGetProducts,
  useMutationProducts
} from '../home/hooks/useGetProducts';

const mockUsers = [
  {
    id: 1,
    username: 'johnd',
    password: 'm38rmF$'
  }
];

const FIELDS_PRODUCT: (keyof Product)[] = [
  'id',
  'title',
  'description',
  'price',
  'image'
];

export const AdminScreen = () => {
  const [table, setTable] = useState<'products' | 'users'>('products');
  const [opened, { close, open }] = useDisclosure(false);

  const { data: products } = useGetProducts();
  const { postProducts, putProducts, deleteProducts } = useMutationProducts();

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
          <Button
            className='ml-auto mt-2 block'
            variant='gradient'
            onClick={open}
          >
            Добавить новую строку в таблицу: {table}
          </Button>
        </Group>
        {table === 'products' ? (
          <CrudTableLayout
            headers={FIELDS_PRODUCT}
            bodies={products}
            onRemove={id => deleteProducts(id)}
            onEdit={(id, updateElement) =>
              putProducts({ id, updateProduct: updateElement })
            }
          />
        ) : (
          <CrudTableLayout
            headers={['id', 'username', 'password']}
            bodies={mockUsers}
          />
        )}

        <Modal opened={opened} onClose={close} centered={true}>
          <CrudForm
            labels={
              table === 'products'
                ? FIELDS_PRODUCT
                : ['id', 'username', 'password']
            }
            body={{} as any}
            onSave={changedBody => {
              if (table === 'products') {
                postProducts({ newProduct: changedBody });
              } else {
                // TODO: USER post
              }
            }}
            onCancel={close}
          />
        </Modal>
      </Stack>
    </Layout>
  );
};
