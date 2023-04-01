import { TLink } from '@/types';

export const notAuthorizationLinks: TLink[] = [
  {
    title: 'Главная',
    href: '/'
  },
  {
    title: 'Купоны',
    href: '/bonuses'
  },
  {
    title: 'Вход',
    href: '/authorization'
  }
];

export const authorizationLinksNavbar: TLink[] = notAuthorizationLinks.slice(
  0,
  notAuthorizationLinks.length - 2
);

export const authorizationLinks: TLink[] = [
  {
    title: 'Профиль',
    href: '/lk'
  },
  {
    title: 'Избранное',
    href: '/lk/liked'
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
