import axios from 'axios';

export const TIMEOUT = 30000;
export const BASE_URL = 'http://localhost:8081';

export const Connector = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});
