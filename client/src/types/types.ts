import { NextPage } from 'next';

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

export type TUserDetails = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type AuthUser = Omit<User, 'id' | 'roles'>;

export type Role = 'USER' | 'ADMIN';

export type AvailableTable = keyof typeof QueryKeys;

export type TLink = {
  title: string;
  href: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithAuth<P = {}> = NextPage<P> & {
  isOnlyUser: boolean;
};

export type TypeComponentAuthFields = {
  Component: {
    isOnlyUser: boolean;
  };
};
