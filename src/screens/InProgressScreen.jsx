// screens/OrderStatusScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import OrderStatusCard from '../components/InProgressCard';

export default function InProgressScreen() {
  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#7C4DFF"
        iconName="truck-delivery-outline"
        title="En Curso"
      />

      <OrderStatusCard
        orderId={8}
        client="Agustín Barría"
        address="Dean Funes 1555"
        status="EN CAMINO"
        startTime="20:17:28 22-04-2025"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(124, 77, 255, 0.1)',
  },
});
