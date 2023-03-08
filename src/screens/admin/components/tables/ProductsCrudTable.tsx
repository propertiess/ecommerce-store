import { useState } from 'react';
import { Button, Drawer, Group, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import { ProductsCrudForm } from '@/screens/admin/components/forms/ProductsCrudForm';
import {
  useGetProducts,
  useMutationProducts
} from '@/screens/home/hooks/useGetProducts';
import { Product } from '@/types';

const productKeys: (keyof Product)[] = [
  'id',
  'title',
  'description',
  'price',
  'image'
];

export const ProductsCrudTable = () => {
  const [choiceProduct, setChoiceProduct] = useState<Product | null>(null);
  const [opened, { close, open }] = useDisclosure(false);

  const [operation, setOperation] = useState<'post' | 'put'>();

  const { data: products } = useGetProducts();
  const { postProducts, putProducts, deleteProducts } = useMutationProducts();

  const changeRow = (p: Product) => {
    setChoiceProduct(p);
    setOperation('put');
    open();
  };

  const addRow = () => {
    open();
    setChoiceProduct(null);
    setOperation('post');
  };

  return (
    <>
      <Group position='right'>
        <Button
          className='ml-auto mt-2 block'
          variant='gradient'
          onClick={addRow}
        >
          Добавить новую строку в таблицу: products
        </Button>
      </Group>
      <Table>
        <thead>
          <tr>
            {productKeys.map(key => (
              <th key={key}>{key}</th>
            ))}
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(product => (
            <tr key={product.id}>
              {productKeys.map(key => (
                <td key={key}>{product[key]}</td>
              ))}
              <td>
                <Group>
                  <IconEdit
                    className='cursor-pointer'
                    onClick={() => changeRow(product)}
                  />
                  <IconTrash
                    className='cursor-pointer'
                    onClick={() => deleteProducts(product.id)}
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
        title={
          operation === 'post' ? 'Создание новой строки' : 'Изменение строки'
        }
        position='right'
      >
        <ProductsCrudForm
          product={choiceProduct}
          onSave={async product => {
            switch (operation) {
              case 'post': {
                await postProducts(product);
                break;
              }

              case 'put': {
                await putProducts(product as Product);
                break;
              }
            }
          }}
        />
      </Drawer>
    </>
  );
};
