import { instance } from '../api/main/instance';

import { LikedDto } from './liked.dto';

const endpoint = '/likeds';

export const LikedService = {
  async get(userId: number) {
    const { data } = await instance.get<LikedDto>(`${endpoint}/${userId}`);
    return data;
  },

  async put(dto: LikedDto) {
    const { data } = await instance.put<LikedDto>(
      `${endpoint}/${dto.userId}`,
      dto
    );
    return data;
  },

  async post(dto: LikedDto) {
    const { data } = await instance.post<LikedDto>(`${endpoint}`, dto);
    return data;
  }
};
