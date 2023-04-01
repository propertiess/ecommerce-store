import { instance } from '../api/main/instance';

import { BasketDto } from './basket.dto';

const endpoint = '/baskets';

export const BasketService = {
  async get(userId: number) {
    const { data } = await instance.get<BasketDto>(`${endpoint}/${userId}`);
    return data;
  },

  async put(dto: BasketDto) {
    const { data } = await instance.put<BasketDto>(
      `${endpoint}/${dto.userId}`,
      dto
    );
    return data;
  },

  async post(dto: BasketDto) {
    const { data } = await instance.post<BasketDto>(`${endpoint}`, dto);
    return data;
  }
};
