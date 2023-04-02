import { Category, Role, TUserDetails } from '@/types';

export const QueryKeys = {
  products: 'products',
  users: 'users',
  'users-details': ' users-details'
} as const;

export const AuthEnum = {
  TOKEN: 'token'
} as const;

export const RoleEnum: Record<Role, Role> = {
  USER: 'USER',
  ADMIN: 'ADMIN'
} as const;

export const ProductCategories: Category[] = [
  'MEN',
  'WOMEN',
  'JEWELERY',
  'WATCHES'
];

export const DetailsDictionary: Record<
  keyof Omit<TUserDetails, 'userId'>,
  string
> = {
  email: 'Почта',
  firstName: 'Имя',
  lastName: 'Фамилия',
  phone: 'Телефонный номер'
};

export const initialFieldsUserDetails = {
  email: '',
  firstName: '',
  lastName: '',
  phone: ''
};
