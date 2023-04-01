import { Bonus } from '@/screens/bonuses/types';

import { instance } from '../api/second/second.instance';

const endpoint = '/bonuses';

export const BonusService = {
  async getAll() {
    const { data } = await instance.get<Bonus[]>(endpoint);
    return data;
  }
};
