import { instance } from '@/services/instance';
import { AuthUser, User } from '@/types';

export const AuthService = {
  async register(user: AuthUser): Promise<User> {
    const { data } = await instance.post<User>('/register', user);
    return data;
  },

  async login(user: AuthUser): Promise<User> {
    const { data } = await instance.post<User>('/login', user);
    return data;
  }
};
