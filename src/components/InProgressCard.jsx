// components/OrderStatusCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InProgressCard({ orderId, client, address, status, startTime }) {
  return (
    <View style={styles.card}>
      <View style={styles.idSection}>
        <Text style={styles.label}>Pedido ID:</Text>
        <Text style={styles.value}>#{orderId}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.row}>
          <Text style={styles.bold}>Cliente: </Text>{client}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.bold}>Dirección: </Text>{address}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.bold}>Inicio: </Text>{startTime}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  idSection: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  detailSection: {
    gap: 6,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    marginTop: 4,
    fontSize: 16,
    color: '#333',
  },
  row: {
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
});
