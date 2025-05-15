// api/DeliveryApi.js
import api from "./apiClient";

const DeliveryService = {
  async getOrdersByStatus(status) {
    try {
      const response = await api.get(`/delivery/${status}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Error al obtener órdenes"
      );
    }
  },
};

export default DeliveryService;
