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
  const { mutatePost, mutatePut, mutateDelete } = useMutationProducts();

  const onUpdate = (updateProduct: Product | Omit<Product, 'id'>) => {
    mutatePut(updateProduct as Product);
  };

  const onPost = (postProduct: Omit<Product, 'id'>) => {
    mutatePost(postProduct as Omit<Product, 'id'>);
  };

  return {
    products,
    choiceProduct: tableElement,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onDelete: onDelete(id => {
      mutateDelete(id);
    }),
    onSave: onSave(onPost, onUpdate),
    close
  };
};
