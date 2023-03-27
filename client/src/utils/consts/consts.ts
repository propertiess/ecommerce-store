import { Role } from '@/types';

export const QueryKeys = {
  products: 'products',
  users: 'users'
};

export const AuthEnum = {
  TOKEN: 'token'
};

export const RoleEnum: Record<Role, Role> = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};
