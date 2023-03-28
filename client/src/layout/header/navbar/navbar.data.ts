import { TLink } from '@/types';

export const notAuthorizationLinks: TLink[] = [
  {
    title: 'Главная',
    href: '/'
  },
  {
    title: 'Машины',
    href: '/cars'
  },
  {
    title: 'Вход',
    href: '/authorization'
  }
];

export const authorizationLinks: TLink[] = [
  ...notAuthorizationLinks.slice().splice(0, notAuthorizationLinks.length - 1),
  {
    title: 'Корзина',
    href: '/order'
  }
];

export const privateLinks: TLink[] = [
  ...authorizationLinks,
  {
    title: 'Админ панель',
    href: '/admin'
  }
];
