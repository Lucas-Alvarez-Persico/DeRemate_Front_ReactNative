import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.72:8080', // IP LOCAL
  timeout: 10000,
});

export default api;
