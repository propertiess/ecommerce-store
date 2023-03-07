import { useQuery } from '@tanstack/react-query';
import { queryClient } from 'pages/_app';

import { ProductService } from '@/services/product/product.service';
import { QueryKeys } from '@/utils/consts';

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.products],
    queryFn: () => ProductService.getAll()
  });
};

export const useProductsData = () => {
  return queryClient.getQueryData([QueryKeys.products]);
};
