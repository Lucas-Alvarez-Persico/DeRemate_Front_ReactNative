// screens/OrdersScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import OrderList from '../components/OrderList';

const orders = [
  { id: 1, address: 'Simon de Iriondo 1119' },
  { id: 2, address: 'Juan Domingo Peron 2045' },
  { id: 3, address: 'Libertador 1124' },
  { id: 4, address: 'Simon de Iriondo 1119' },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#7C4DFF"
        iconName="clipboard-list-outline"
        title="Órdenes"
      />
      <OrderList orders={orders} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9d8fd',
  },
});
