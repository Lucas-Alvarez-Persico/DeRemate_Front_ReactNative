// hooks/useDeliveryApi.js
import { useAxios } from '../hooks/useAxios';

const useDeliveryApi = () => {
  const axiosInstance = useAxios();

  const getOrdersByStatus = async (status) => {
    try {
      const response = await axiosInstance.get(`/delivery/${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Error al obtener órdenes";
    }
  };

  const assingDelivery = async (deliveryId) => {
    try {
      const response = await axiosInstance.put(`/delivery/${deliveryId}`);
      return response.data
    } catch (error) {
      throw error.response?.data?.message || "Error al asignar la orden";
    }
  }

  return { getOrdersByStatus, assingDelivery };
};

export default useDeliveryApi;
