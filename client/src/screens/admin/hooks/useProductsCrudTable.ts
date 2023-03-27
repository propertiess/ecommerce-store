import { useMutationProducts } from '@/screens/admin/hooks/useMutationProducts';
import { useGetProducts } from '@/screens/home/hooks/useGetProducts';
import { Product } from '@/types';

import { useCrudTable } from './useCrudTable';

export const useProductsCrudTable = () => {
  const {
    tableElement,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onSave,
    onDelete,
    close
  } = useCrudTable<Product | Omit<Product, 'id'>>();

  const { data: products } = useGetProducts();
  const { postProducts, putProducts, deleteProducts } = useMutationProducts();

  const onUpdate = (updateProduct: Product | Omit<Product, 'id'>) => {
    putProducts(updateProduct as Product);
  };

  const onPost = (postProduct: Product | Omit<Product, 'id'>) => {
    postProducts(postProduct);
  };

  return {
    products,
    choiceProduct: tableElement,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onDelete: onDelete(id => {
      deleteProducts(id);
    }),
    onSave: onSave(onPost, onUpdate),
    close
  };
};
