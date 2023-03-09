import { useQuery } from '@tanstack/react-query';
import { queryClient } from 'pages/_app';

import { ProductService } from '@/services/product/product.service';
import { Product } from '@/types';
import { QueryKeys } from '@/utils/consts';
import { showErrorNotification } from '@/utils/helpers/notifications';

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.products],
    queryFn: () => ProductService.getAll(),
    onError: () => {
      showErrorNotification('Не удалось получить данные!');
    }
  });
};

export const useProductsData = () => {
  return queryClient.getQueryData<Product[]>([QueryKeys.products]);
};
