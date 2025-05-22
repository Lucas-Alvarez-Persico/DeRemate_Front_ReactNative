import axios from 'axios';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getToken } from '../utils/tokenStorage';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

export const useAxios = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const axiosInstance = useRef(axios.create({ baseURL: 'http://192.168.68.63:8080' }));

  useEffect(() => {
    const instance = axiosInstance.current;

    instance.interceptors.request.use(async (config) => {
      let token;

      // ✅ Elegimos el token según el endpoint
      if (config.url?.includes('/user/newPassword')) {
        token = await SecureStore.getItemAsync('recover_token');
      } else {
        token = await getToken(); // Devuelve access_token desde tu utils/tokenStorage
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response?.status === 401) {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
        return Promise.reject(err);
      }
    );
  }, []);

  return axiosInstance.current;
};
