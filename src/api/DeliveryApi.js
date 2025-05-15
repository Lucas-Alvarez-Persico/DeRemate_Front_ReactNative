import api from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InProgressService = {

  async getInProgressOrder() {
    try {
      const response = await api.get("/delivery/EN_CAMINO");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Error al obtener la orden en progreso"
      );
    }
  },
};

export default InProgressService;
