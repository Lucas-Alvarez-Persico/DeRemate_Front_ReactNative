// components/OrderList.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function OrderList({ data, onPressItem }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {data.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => onPressItem(item)}>
          <View style={styles.card}>
            <Text style={styles.orderTitle}>Orden #{item.order.id}</Text>
            <Text style={styles.orderAddress}>Dirección: {item.order.address}</Text>
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
