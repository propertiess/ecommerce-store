import { deleteCookie, setCookie } from 'cookies-next';
import { makeAutoObservable } from 'mobx';

import { AuthEnum, RoleEnum } from '@/utils/consts';

class Auth {
  authToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthToken = (token: string) => {
    this.authToken = token;
    setCookie(AuthEnum.TOKEN, token);
  };

  removeToken = () => {
    this.authToken = null;
    deleteCookie(AuthEnum.TOKEN);
  };

  get isAdmin(): boolean {
    return !!this.authToken && atob(this.authToken) === RoleEnum.ADMIN;
  }

  get isUser(): boolean {
    return !!this.authToken && atob(this.authToken) === RoleEnum.USER;
  }
}

const store = new Auth();

export const useAuthStore = () => store;
