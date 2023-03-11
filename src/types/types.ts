export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  img: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
  roles: Role;
};
export type AuthUser = Omit<User, 'id' | 'roles'>;

export type Role = 'USER' | 'ADMIN';

export type AvailableTable = 'products' | 'users';

export type TLink = {
  title: string;
  href: string;
};
