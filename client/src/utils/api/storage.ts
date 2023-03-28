import { checkAvailableStorage } from '../helpers/check-available-storage';

export type StorageKeys = 'user-id';

export const Storage = {
  getItem<T>(key: StorageKeys): T | undefined {
    if (!checkAvailableStorage()) {
      return;
    }
    const data = localStorage.getItem(key);
    if (!data) {
      return;
    }
    const parsedData = JSON.parse(data) as T;

    return parsedData;
  },

  setItem<T>(key: StorageKeys, data: T): boolean {
    if (!checkAvailableStorage()) {
      return false;
    }

    const jsonData = JSON.stringify(data) as string;
    localStorage.setItem(key, jsonData);
    return true;
  }
};
