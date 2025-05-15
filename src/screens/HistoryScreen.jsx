// screens/HistoryScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import OrderList from '../components/OrderList';

const completedOrders = [
  { id: 1, address: 'Jamaica 123' },
  { id: 3, address: 'San juan 123' },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#FFD93D"
        iconName="clipboard-check-outline"
        title="Historial Órdenes Completadas"
      />
      <OrderList
        data={completedOrders}
        renderTitle={(item) => `Orden # ${item.id}`}
        renderSubtitle={(item) => `Dirección: ${item.direccion}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
  },
});
