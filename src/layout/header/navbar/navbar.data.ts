import { TLink } from '@/types';

export const notAuthorizationLinks: TLink[] = [
  {
    title: 'Главная',
    href: '/'
  },
  {
    title: 'Вход',
    href: '/authorization'
  }
];

export const authorizationLinks: TLink[] = notAuthorizationLinks
  .slice()
  .splice(0, 1);

export const privateLinks: TLink[] = [
  ...notAuthorizationLinks.slice().splice(0, 1),
  {
    title: 'Админ панель',
    href: '/admin'
  }
];
