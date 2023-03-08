export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
};

export type AvailableTable = 'products' | 'users';

export type TLink = {
  title: string;
  href: string;
};
