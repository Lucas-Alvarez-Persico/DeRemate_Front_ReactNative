// components/OrderList.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function OrderList({ orders }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {orders.map((order) => (
        <View key={order.id} style={styles.card}>
          <Text style={styles.orderTitle}>Orden # {order.id}</Text>
          <Text style={styles.orderAddress}>Dirección: {order.address}</Text>
        </View>
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
