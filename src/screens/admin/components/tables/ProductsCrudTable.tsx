import { Button, Drawer, Group, Table } from '@mantine/core';
import { Edit, Trash } from 'tabler-icons-react';

import { ProductsCrudForm } from '@/screens/admin/components/forms/ProductsCrudForm';
import { useProductsCrudTable } from '@/screens/admin/hooks/useProductsCrudTable';
import { Product } from '@/types';

const productKeys: (keyof Product)[] = [
  'id',
  'title',
  'description',
  'price',
  'image'
];

export const ProductsCrudTable = () => {
  const {
    products,
    choiceProduct,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onSave,
    onDelete,
    close
  } = useProductsCrudTable();

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
                  <Edit
                    className='cursor-pointer'
                    onClick={() => changeRow(product)}
                  />
                  <Trash
                    className='cursor-pointer'
                    onClick={() => onDelete(product.id)}
                  />
                </Group>
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
        <ProductsCrudForm product={choiceProduct} onSave={onSave} />
      </Drawer>
    </>
  );
};
