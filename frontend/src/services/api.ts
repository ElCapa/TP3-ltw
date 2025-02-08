import axios from 'axios';
import { Shark } from '../types/shark';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export const getSharks = async (): Promise<Shark[]> => {
  const response = await api.get<{ sharks: Shark[] }>("/sharks");
  return response.data.sharks;
};

export default api;
