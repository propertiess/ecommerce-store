import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from 'pages/_app';

import { ProductService } from '@/services/product/product.service';
import { Product } from '@/types';
import { QueryKeys } from '@/utils/consts';
import { showErrorNotification } from '@/utils/helpers/notifications';

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.products],
    queryFn: async () => {
      try {
        return await ProductService.getAll();
      } catch (e) {
        e instanceof Error && showErrorNotification(e.message);
      }
    }
  });
};

export const useMutationProducts = () => {
  const { mutateAsync: deleteProducts } = useMutation({
    mutationFn: (id: number) => ProductService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.products] });
    }
  });

  const { mutateAsync: putProducts } = useMutation({
    mutationFn: (updateProduct: Product) => ProductService.put(updateProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.products] });
    }
  });

  const { mutateAsync: postProducts } = useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) =>
      ProductService.post(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.products] });
    }
  });

  return {
    postProducts,
    deleteProducts,
    putProducts
  };
};

export const useProductsData = () => {
  return queryClient.getQueryData<Product[]>([QueryKeys.products]);
};
