// hooks/useAuthApi.js
import { useAxios } from '../hooks/useAxios';

const useAuthApi = () => {
  const axiosInstance = useAxios();

  const login = async ({ username, password }) => {
    try {
      const response = await axiosInstance.post('/user/login', { username, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al iniciar sesión';
    }
  };

  const registerMail = async (user) => {
    try {
      console.log('Usuario registrado:', user);
      const response = await axiosInstance.post('/user/register/mail', user);
      return response.data;
    } catch (error) {
      console.log('ESTOY ACA ERROR CACA:', user);
      throw error.response?.data?.message || 'Error al enviar correo de registro';
    }
  };

  const register = async ({ username, code }) => {
    try {
      const response = await axiosInstance.post('/user/register', { username, code });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al registrar usuario';
    }
  };

  const recoverMail = async (username) => {
    try {
      const response = await axiosInstance.post('/user/recover/mail', username, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al enviar correo de recuperación';
    }
  };

  const recover = async ({ username, code }) => {
    try {
      const response = await axiosInstance.post('/user/recover', { username, code });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al recuperar contraseña';
    }
  };

  const updatePassword = async ({ username, password }) => {
    try {
      const response = await axiosInstance.post('/user/newPassword', { username, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al establecer nueva contraseña';
    }
  };

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener perfil';
    }
  };

  return {
    login,
    registerMail,
    register,
    recoverMail,
    recover,
    updatePassword,
    getProfile,
  };
};

export default useAuthApi;
