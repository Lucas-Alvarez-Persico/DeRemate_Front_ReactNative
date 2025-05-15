// screens/DetailsScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';

export default function DetailsScreen() {
  const route = useRoute();
  const { order } = route.params; // recibimos la orden desde navigation

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#7C4DFF"
        iconName="clipboard-text-outline"
        title={`Orden #${order.id}`}
      />

      <View style={styles.detailsCard}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{order.id}</Text>

        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{order.address}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{order.state}</Text>

        <Text style={styles.label}>Cliente:</Text>
        <Text style={styles.value}>{order.client}</Text>

        <Text style={styles.label}>Ubicación del paquete:</Text>
        <Text style={styles.value}>{order.packageLocation}</Text>

        {/* Agregá más campos si los tenés */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(124, 77, 255, 0.05)',
  },
  detailsCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 15,
  },
  value: {
    fontSize: 15,
    color: '#333',
  },
});
