import { User } from '@/types';

import { instance } from '../instance';

const endpoint = '/users';

export const UserService = {
  async getAll(): Promise<User[]> {
    const { data } = await instance.get<User[]>(endpoint);
    return data;
  },

  async update(user: User) {
    const { data } = await instance.put(`${endpoint}/${user.id}`, user);
    return data;
  },

  async post(user: Omit<User, 'id'>) {
    const { data } = await instance.post(endpoint, user);
    return data;
  },

  async delete(id: number) {
    const { data } = await instance.delete(`${endpoint}/${id}`);
    return data;
  }
};
