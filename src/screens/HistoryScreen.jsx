import React, { useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import Header from "../components/Header";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderList from "../components/OrderList";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import useDeliveryService from "../api/DeliveryApi";

export default function HistoryScreen() {
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { getOrdersByStatus } = useDeliveryService();

  const fetchHistoryOrders = useCallback(async (isActive) => {
    setLoading(true);
    setError(null);

    try {
      const orders = await getOrdersByStatus("COMPLETADO");
      if (isActive) {
        if (orders.length > 0) {
          setHistoryOrders(orders);
        } else {
          setHistoryOrders([]);
          setError("No hay entregas completadas");
        }
      }
    } catch (error) {
      if (isActive) {
        setError("No se pudieron cargar las órdenes.");
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
      {/* Encabezado */}
      <View style={styles.header}>
              <Icon name="clipboard-check-outline" size={50} color="#fff" />
              <Text style={styles.headerText}>Historial Órdenes Completadas</Text>
      </View>
      
      {!loading && !error && (
        <OrderList orders={historyOrders} onPress={handlePress} />
      )}
      <View style={{ flex: 1 }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFD93D',
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
});
