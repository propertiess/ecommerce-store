import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from 'pages/_app';

import { ProductService } from '@/services/product/product.service';
import { Product } from '@/types';
import { QueryKeys } from '@/utils/consts';

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.products],
    queryFn: () => ProductService.getAll()
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
    mutationFn: ({
      id,
      updateProduct
    }: {
      id: number;
      updateProduct: Product;
    }) => {
      return ProductService.putById(id, updateProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.products] });
    }
  });

  const { mutateAsync: postProducts } = useMutation({
    mutationFn: ({ newProduct }: { newProduct: Omit<Product, 'id'> }) => {
      return ProductService.post(newProduct);
    },
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
