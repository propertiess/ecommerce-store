import { instance } from '../api/main/instance';

import { OrderDto } from './order.dto';

const endpoint = '/orders';

export const OrderService = {
  async getByUserId(userId: number) {
    const { data } = await instance.get<OrderDto>(`${endpoint}/${userId}`);
    return data;
  },

  async put(dto: OrderDto) {
    const { data } = await instance.put<OrderDto>(
      `${endpoint}/${dto.userId}`,
      dto
    );
    return data;
  },

  async post(dto: OrderDto) {
    const { data } = await instance.post<OrderDto>(`${endpoint}`, dto);
    return data;
  }
};
