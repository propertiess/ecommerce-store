import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

import {
  useGetProducts,
  useMutationProducts
} from '@/screens/home/hooks/useGetProducts';
import { Product } from '@/types';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/helpers/notifications';

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

  const onDelete = async (productId: number): Promise<void> => {
    try {
      await deleteProducts(productId);
      showSuccessNotification('Данные удалены');
    } catch (e) {
      showErrorNotification('Данные не удалены!');
    }
  };

  const onPost = async (
    product: Product | Omit<Product, 'id'>
  ): Promise<void> => {
    try {
      await postProducts(product);
      showSuccessNotification('Новые данные добавлены');
    } catch (e) {
      showErrorNotification('Новые данные не добавлены!');
    }
  };

  const onUpdate = async (
    product: Product | Omit<Product, 'id'>
  ): Promise<void> => {
    try {
      await putProducts(product as Product);
      showSuccessNotification('Данные изменены');
    } catch (e) {
      showErrorNotification('Данные не изменены!');
    }
  };

  const onSave = async (
    product: Product | Omit<Product, 'id'>
  ): Promise<void> => {
    switch (operation) {
      case 'post': {
        await onPost(product);
        break;
      }

      case 'put': {
        await onUpdate(product);
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
