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

  return { getOrdersByStatus };
};

export default useDeliveryApi;
