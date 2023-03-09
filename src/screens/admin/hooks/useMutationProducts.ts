import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/../pages/_app';
import { ProductService } from '@/services/product/product.service';
import { Product } from '@/types';
import { QueryKeys } from '@/utils/consts';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/helpers/notifications';

export const useMutationProducts = () => {
  const { mutate: deleteProducts } = useMutation({
    mutationFn: (id: number) => ProductService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.products] });
      showSuccessNotification('Данные удалены');
    },
    onError: e => {
      console.log(e);
      showErrorNotification('Не удалось удалить данные!');
    }
  });

  const { mutate: putProducts } = useMutation({
    mutationFn: (updateProduct: Product) => ProductService.put(updateProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.products] });
      showSuccessNotification('Данные изменены');
    },
    onError: () => {
      showErrorNotification('Не удалось изменить данные!');
    }
  });

  const { mutate: postProducts } = useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) =>
      ProductService.post(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.products] });
      showSuccessNotification('Новые данные добавлены');
    },
    onError: () => {
      showErrorNotification('Не удалось добавить данные!');
    }
  });

  return {
    postProducts,
    deleteProducts,
    putProducts
  };
};
