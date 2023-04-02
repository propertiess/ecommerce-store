import { QueryKeys } from '@/utils/consts';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  img: string;
  rating: number;
  category: Category;
};

export type Category = 'MEN' | 'WOMEN' | 'JEWELERY' | 'WATCHES';

export type User = {
  id: number;
  username: string;
  password: string;
  roles: Role;
};
export type AuthUser = Omit<User, 'id' | 'roles'>;

export type Role = 'USER' | 'ADMIN';

export type AvailableTable = keyof typeof QueryKeys;

export type TLink = {
  title: string;
  href: string;
};
