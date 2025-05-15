// screens/OrdersScreen.jsx
import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import DeliveryService from "../api/DeliveryApi"; // 👈 usar el nuevo servicio

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handlePress = (order) => {
    navigation.navigate("Details", { order });
  };

  const fetchOrders = useCallback(async (isActive, setOrders, setLoading) => {
    setLoading(true);
    try {
      const data = await DeliveryService.getOrdersByStatus("PENDIENTE");
      if (isActive) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      if (isActive) {
        Alert.alert("Error", "No se pudieron cargar las órdenes.");
      }
    } finally {
      if (isActive) setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      fetchOrders(isActive, setOrders, setLoading);

      return () => {
        isActive = false;
      };
    }, [fetchOrders])
  );

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#7C4DFF"
        iconName="clipboard-list-outline"
        title="Órdenes"
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#7C4DFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <OrderList data={orders} onPressItem={handlePress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(124, 77, 255, 0.1)",
  },
});
