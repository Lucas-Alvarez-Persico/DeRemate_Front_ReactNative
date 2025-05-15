// services/UserService.js
import api from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserService = {
    

    async getToken() {
    try {
        const token = await AsyncStorage.getItem('access_token');
        return token;
    } catch (error) {
        console.error('Error al obtener token:', error);
        return null;
    }
    },

  async login({ username, password }) {
    try {
      const response = await api.post('/user/login', { username, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al iniciar sesión';
    }
  },

  async registerMail(user) {
    try {
      const response = await api.post('/user/register/mail', user);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al enviar correo de registro';
    }
  },

  async register({ username, code }) {
    try {
      const response = await api.post('/user/register', { username, code });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al registrar usuario';
    }
  },

  async recoverMail(username) {
    try {
      const response = await api.post('/user/recover/mail', username, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al enviar correo de recuperación';
    }
  },

  async recover({ username, code }) {
    try {
      const response = await api.post('/user/recover', { username, code });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al recuperar contraseña';
    }
  },

  async newPassword({ username, password }) {
    try {
      const response = await api.post('/user/newPassword', { username, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al establecer nueva contraseña';
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener perfil';
    }
  },
};

export default UserService;