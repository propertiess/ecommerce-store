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
  {
    title: 'Профиль',
    href: '/lk'
  },
  {
    title: 'Корзина',
    href: '/lk/basket'
  }
];

export const privateLinks: TLink[] = [
  ...notAuthorizationLinks.slice().splice(0, notAuthorizationLinks.length - 1),
  {
    title: 'Админ панель',
    href: '/admin'
  }
];
