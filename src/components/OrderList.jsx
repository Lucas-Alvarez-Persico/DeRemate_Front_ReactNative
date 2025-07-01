// components/OrderList.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function OrderList({ orders = [], onPress }) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay órdenes disponibles.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {orders.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => onPress(item)}>
          <View style={styles.card}>
            <Text style={styles.orderTitle}>Orden #{item.order?.id ?? 'N/A'}</Text>
            <Text style={styles.orderPackageLocation}>Ubicación del paquete: {item.order?.packageLocation ?? 'Sin ubicación del paquete'}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  orderTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  orderAddress: {
    fontSize: 14,
    color: '#333',
  },
});