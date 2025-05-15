// screens/OrdersScreen.jsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import api from "../api/apiClient";

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/order');
      setOrders(response.data);
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      Alert.alert("Error", "No se pudieron cargar las órdenes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#7C4DFF"
        iconName="clipboard-list-outline"
        title="Órdenes"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#7C4DFF" style={{ marginTop: 20 }} />
      ) : (
        <OrderList data = {orders}></OrderList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(124, 77, 255, 0.1)',
  },
});
