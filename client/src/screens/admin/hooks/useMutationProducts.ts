import { ProductService } from '@/services/product/product.service';
import { QueryKeys } from '@/utils/consts';

import { useMutationCrudTable } from './useMutationCrudTable';

export const useMutationProducts = () =>
  useMutationCrudTable(QueryKeys.products, ProductService);
