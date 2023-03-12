import { useMutation } from '@tanstack/react-query';

import { ProductService } from '@/services/product/product.service';
import { Product } from '@/types';
import { QueryKeys } from '@/utils/consts';
import { mutationOnSuccessOnError } from '@/utils/helpers/mutationOnSuccessOnError';

export const useMutationProducts = () => {
  const { mutate: deleteProducts } = useMutation({
    mutationFn: (id: number) => ProductService.deleteById(id),
    ...mutationOnSuccessOnError([QueryKeys.products], 'delete')
  });

  const { mutate: putProducts } = useMutation({
    mutationFn: (updateProduct: Product) => ProductService.put(updateProduct),
    ...mutationOnSuccessOnError([QueryKeys.products], 'put')
  });

  const { mutate: postProducts } = useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) =>
      ProductService.post(newProduct),
    ...mutationOnSuccessOnError([QueryKeys.products], 'post')
  });

  return {
    postProducts,
    deleteProducts,
    putProducts
  };
};
