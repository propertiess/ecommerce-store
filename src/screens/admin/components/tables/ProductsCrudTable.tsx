import { Button, Drawer, Group, Table } from '@mantine/core';

import { GroupOperationButtons } from '@/components/GroupOperationButtons';
import { ProductsCrudForm } from '@/screens/admin/components/forms/ProductsCrudForm';
import { useProductsCrudTable } from '@/screens/admin/hooks/useProductsCrudTable';
import { Product } from '@/types';

const productKeys: (keyof Product)[] = [
  'id',
  'title',
  'description',
  'price',
  'img'
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
                <GroupOperationButtons
                  onEdit={() => changeRow(product)}
                  onDelete={() => onDelete(product.id)}
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
        <ProductsCrudForm
          product={choiceProduct}
          onSave={product => onSave(product)}
        />
      </Drawer>
    </>
  );
};
