import { instance } from '../api/main/instance';

import { OrderDto } from './order.dto';

const endpoint = '/orders';

export const OrderService = {
  async get(userId: number): Promise<OrderDto> {
    const { data } = await instance.get(`${endpoint}/${userId}`);
    return data;
  },

  async put(dto: OrderDto): Promise<OrderDto> {
    const { data } = await instance.put(`${endpoint}/${dto.userId}`, dto);
    return data;
  },

  async post(dto: OrderDto): Promise<OrderDto> {
    const { data } = await instance.post(endpoint, dto);
    return data;
  }
};
