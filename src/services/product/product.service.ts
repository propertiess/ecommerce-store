import { instance } from '@/services/instance';
import { Product } from '@/types';

export const ProductService = {
  async getAll() {
    const { data } = await instance.get<Product[]>('/products');
    return data;
  }
};
