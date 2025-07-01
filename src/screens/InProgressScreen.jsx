// screens/OrderStatusScreen.js
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import useDeliveryService from "../api/DeliveryApi";
import Header from "../components/Header";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { openGoogleMaps } from "../components/Map";
import DeliveryConfirmationCode from '../components/DeliveryConfirmationCode';
import OrderStatusCard from "../components/InProgressCard";

export default function InProgressScreen() {
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getOrdersByStatus } = useDeliveryService();

  const fetchDelivery = useCallback(
    async (isActive, setDelivery, setError, setLoading) => {
      setLoading(true);
      setError(null);

      try {
        const delivery = await getOrdersByStatus("EN_CAMINO");

        if (isActive) {
          if (delivery.length > 0) {
            setDelivery(delivery[0]);
          } else {
            setDelivery(null);
            setError("No hay entregas en curso");
          }
        }
      } catch (err) {
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

      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="truck-delivery-outline" size={50} color="#fff" />
        <Text style={styles.headerText}>En Curso</Text>
      </View>
      {delivery && (
        <View>
          <OrderStatusCard
            orderId={delivery.id}
            client={delivery.order.client}
            address={delivery.order.address}
            startTime={formatDateTime(delivery.startTime)}
          />

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => openGoogleMaps(delivery?.order?.address)}
          >
            <Icon name="map-marker-radius" size={24} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.mapButtonText}>Ver en Google Maps</Text>
          </TouchableOpacity>

          <DeliveryConfirmationCode
          deliveryId={delivery.id}
          onConfirmed={() => fetchDelivery(true)}
          />
        </View>
      )}
      
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

    </View>
  );
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const time = date.toLocaleTimeString("es-AR");
  const day = date.toLocaleDateString("es-AR");
  return `${time} ${day}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(124, 77, 255, 0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#7C4DFF',
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 10,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C4DFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
