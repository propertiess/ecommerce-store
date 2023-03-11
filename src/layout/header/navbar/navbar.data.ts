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
