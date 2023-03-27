import { Car } from '@/screens/cars/types';

import { instance } from '../api/car/car.instance';

const endpoint = '/cars';

export const CarService = {
  async getAll() {
    const { data } = await instance.get<Car[]>(endpoint);
    return data;
  }
};
