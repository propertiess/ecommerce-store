import { ProductsCrudForm } from '@/screens/admin/components/forms/ProductsCrudForm';
import { useProductsCrudTable } from '@/screens/admin/hooks/useProductsCrudTable';

import { CrudDrawer } from '../CrudDrawer';
import { CrudTable } from '../CrudTable';

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
      <CrudTable
        name='products'
        data={products!}
        turnOnPostEditing={addRow}
        onEdit={product => changeRow(product)}
        onDelete={id => onDelete(id)}
      />
      <CrudDrawer
        isOpen={isDrawerOpen}
        operation={operation}
        crudForm={
          <ProductsCrudForm
            product={choiceProduct}
            onSave={product => onSave(product)}
          />
        }
        close={close}
      />
    </>
  );
};
