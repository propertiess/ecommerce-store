import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.CAR_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});