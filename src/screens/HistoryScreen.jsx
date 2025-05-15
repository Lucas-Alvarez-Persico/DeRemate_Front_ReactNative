// screens/HistoryScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import OrderList from '../components/OrderList';

const completedOrders = [
  { id: 1, address: 'Jamaica 123' },
  { id: 3, address: 'San juan 123' },
];

export default function HistoryScreen() {

  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = "a"

  const fetchHistoryOrders = async () => {
    try {
      const response = await api.get('/delivery/COMPLETADO', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });      setHistoryOrders(response.data);
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      Alert.alert("Error", "No se pudieron cargar las órdenes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#FFD93D"
        iconName="clipboard-check-outline"
        title="Historial Órdenes Completadas"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#7C4DFF" style={{ marginTop: 20 }} />
      ) : (
        <OrderList data = {historyOrders}></OrderList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
  },
});
