import { Role } from '@/types';

export const QueryKeys = {
  products: 'products',
  users: 'users'
} as const;

export const AuthEnum = {
  TOKEN: 'token'
} as const;

export const RoleEnum: Record<Role, Role> = {
  USER: 'USER',
  ADMIN: 'ADMIN'
} as const;
