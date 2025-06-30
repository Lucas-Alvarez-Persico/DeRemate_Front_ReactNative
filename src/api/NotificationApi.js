import { useAxios } from '../hooks/useAxios';

const NotificationApi = () => {
  const axiosInstance = useAxios();

  const getUnreadNotifications = async () => {
    try {
      const response = await axiosInstance.get('/user/notification/unread');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener notificaciones';
    }
  };

  return { getUnreadNotifications };
};

export default NotificationApi;
