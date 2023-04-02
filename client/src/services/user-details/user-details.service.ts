import { TUserDetails } from '@/types';

import { instance } from '../api/main/instance';

const endpoint = '/users/details';

export const UserDetailsService = {
  async getAll(): Promise<TUserDetails[]> {
    const { data } = await instance.get(endpoint);
    return data;
  },
  async get(id: number): Promise<TUserDetails> {
    const { data } = await instance.get(`${endpoint}/${id}`);
    return data;
  },

  async put(details: TUserDetails): Promise<TUserDetails> {
    const { data } = await instance.put(
      `${endpoint}/${details.userId}`,
      details
    );
    return data;
  },

  async post(details: TUserDetails): Promise<TUserDetails> {
    const { data } = await instance.post(
      `${endpoint}/${details.userId}`,
      details
    );
    return data;
  },

  async delete(id: number): Promise<TUserDetails> {
    const { data } = await instance.delete(`${endpoint}/${id}`);
    return data;
  }
};
