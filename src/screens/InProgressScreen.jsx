// screens/OrderStatusScreen.js
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeliveryService from "../api/DeliveryApi";
import Header from "../components/Header";

import OrderStatusCard from "../components/InProgressCard";

export default function InProgressScreen() {
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDelivery = useCallback(
    async (isActive, setDelivery, setError, setLoading) => {
      setLoading(true);
      setError(null);

      try {
        const delivery = await DeliveryService.getOrdersByStatus("EN_CAMINO");

        if (isActive) {
          if (delivery.length > 0) {
            setDelivery(delivery[0]);
          } else {
            setDelivery(null);
            setError("No hay entregas en curso");
          }
        }
      } catch (err) {
        console.error(err);
        if (isActive) {
          setError("Error al obtener la entrega");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      fetchDelivery(isActive, setDelivery, setError, setLoading);

      return () => {
        isActive = false;
      };
    }, [fetchDelivery])
  );

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#7C4DFF"
        iconName="truck-delivery-outline"
        title="En Curso"
      />

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#7C4DFF" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text>{error}</Text>
        </View>
      )}

      {delivery && (
        <OrderStatusCard
          orderId={delivery.id}
          client={delivery.order.client}
          address={delivery.order.address}
          startTime={formatDateTime(delivery.startTime)}
        />
      )}
    </View>
  );
}

// Función para formatear la fecha a formato "hh:mm:ss dd-MM-yyyy"
function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const time = date.toLocaleTimeString("es-AR");
  const day = date.toLocaleDateString("es-AR");
  return `${time} ${day}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(124, 77, 255, 0.1)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
