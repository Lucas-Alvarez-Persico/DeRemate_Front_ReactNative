import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.68.63:8081', // IP LOCAL
  timeout: 10000,
});

export default api;
