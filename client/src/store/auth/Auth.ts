import { deleteCookie, setCookie } from 'cookies-next';
import { makeAutoObservable } from 'mobx';

import { Storage } from '@/utils/api/storage';
import { AuthEnum, RoleEnum } from '@/utils/consts';

class Auth {
  authToken: string | null = null;
  userId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (token: string, id: number) => {
    this.authToken = token;
    this.userId = id;
    setCookie(AuthEnum.TOKEN, token);
    Storage.setItem('user-id', id);
  };

  removeUser = () => {
    this.authToken = null;
    this.userId = null;
    deleteCookie(AuthEnum.TOKEN);
    Storage.removeItem('user-id');
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
