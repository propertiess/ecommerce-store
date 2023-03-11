import axios from 'axios';
import { getCookie } from 'cookies-next';

import { AuthEnum } from '@/utils/consts';

export const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(config => {
  const token = getCookie(AuthEnum.TOKEN);

  if (token && config) {
    config.headers.Role = token;
  }

  return config;
});
