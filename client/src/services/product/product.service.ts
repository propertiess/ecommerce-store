import { instance } from '@/services/api/main/instance';
import { Product } from '@/types';

const endpoint = '/products';

export const ProductService = {
  async getAll() {
    const { data } = await instance.get<Product[]>(endpoint);
    return data;
  },

  async get(id: number) {
    const { data } = await instance.get<Product>(`${endpoint}/${id}`);
    return data;
  },

  async delete(id: number) {
    const { data } = await instance.delete<Product>(`${endpoint}/${id}`);
    return data;
  },

  async put(updateProduct: Product) {
    const { data } = await instance.put<Product>(
      `${endpoint}/${updateProduct.id}`,
      updateProduct
    );
    return data;
  },

  async post(newProduct: Omit<Product, 'id'>) {
    const { data } = await instance.post<Product>(endpoint, newProduct);
    return data;
  }
};
