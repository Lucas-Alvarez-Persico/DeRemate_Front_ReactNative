// screens/HistoryScreen.js
import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import api from "../api/apiClient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import DeliveryService from "../api/DeliveryApi"; // 👈 usar el nuevo servicio

export default function HistoryScreen() {
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchHistoryOrders = useCallback(async (isActive) => {
    setLoading(true);
    try {
      const data = await DeliveryService.getOrdersByStatus("COMPLETADO");
      if (isActive) {
        setHistoryOrders(data);
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
      fetchHistoryOrders(isActive);
      return () => {
        isActive = false;
      };
    }, [fetchHistoryOrders])
  );

  const handlePress = (order) => {
    navigation.navigate("Details", { order });
  };

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#FFD93D"
        iconName="clipboard-check-outline"
        title="Historial Órdenes Completadas"
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#7C4DFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <OrderList data={historyOrders} onPressItem={handlePress}></OrderList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 217, 61, 0.1)",
  },
});
