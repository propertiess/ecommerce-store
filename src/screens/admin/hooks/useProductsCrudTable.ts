import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

import { useMutationProducts } from '@/screens/admin/hooks/useMutationProducts';
import { useGetProducts } from '@/screens/home/hooks/useGetProducts';
import { Product } from '@/types';

export const useProductsCrudTable = () => {
  const [choiceProduct, setChoiceProduct] = useState<Product | null>(null);
  const [isDrawerOpen, { close, open }] = useDisclosure(false);

  const [operation, setOperation] = useState<'post' | 'put'>();

  const { data: products } = useGetProducts();
  const { postProducts, putProducts, deleteProducts } = useMutationProducts();

  const changeRow = (p: Product): void => {
    setChoiceProduct(p);
    setOperation('put');
    open();
  };

  const addRow = (): void => {
    open();
    setChoiceProduct(null);
    setOperation('post');
  };

  const onDelete = (productId: number): void => {
    deleteProducts(productId);
  };

  const onSave = (product: Product | Omit<Product, 'id'>): void => {
    switch (operation) {
      case 'post': {
        postProducts(product);
        break;
      }

      case 'put': {
        putProducts(product as Product);
        break;
      }
    }
    close();
  };

  return {
    products,
    choiceProduct,
    operation,
    isDrawerOpen,
    addRow,
    changeRow,
    onDelete,
    onSave,
    close
  };
};
