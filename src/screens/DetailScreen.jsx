// DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params;
  const orderData = order.order;

  const isCompleted = order.status === 'COMPLETADO';

  const handleAccept = () => {
    navigation.navigate('QrScreen', { expectedDeliveryId: order.id });
  };

  function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + 
         ' - ' + 
         date.toLocaleDateString('es-AR');
}

  function formatDuration(durationStr) {
  const [hours, minutes, seconds] = durationStr.split(':');
  return `${parseInt(hours)}h ${parseInt(minutes)}m ${parseInt(seconds)}s`;
  }

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={isCompleted ? '#FFD93D' : '#7C4DFF'}
        iconName="clipboard-text-outline"
        title={`Orden #${orderData.id}`}
      />

      <View style={styles.detailsCard}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{orderData.id}</Text>

        <Text style={styles.label}>Ubicación del paquete:</Text>
        <Text style={styles.value}>{orderData.packageLocation}</Text>

        {!isCompleted && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAccept}
          >
            <Icon name="cube-send" size={24} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.actionButtonText}>Quiero este pedido</Text>
          </TouchableOpacity>

        )}

        {isCompleted && (
          <>
            <Text style={styles.label}>Inicio del envío:</Text>
            <Text style={styles.value}>{formatDateTime(order.startTime)}</Text>

            <Text style={styles.label}>Entrega:</Text>
            <Text style={styles.value}>{formatDateTime(order.endTime)}</Text>


            <Text style={styles.label}>Duración total:</Text>
            <Text style={styles.value}>{formatDuration(order.deliveryTime)}</Text>

            <Text style={styles.label}>Estado final:</Text>
            <Text style={styles.value}>{order.status}</Text>
          </>
        )}
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
  buttonContainer: {
    marginTop: 20,
  },
  actionButton: {
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
actionButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

});