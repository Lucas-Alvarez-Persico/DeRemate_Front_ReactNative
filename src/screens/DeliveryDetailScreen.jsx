import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import useDeliveryApi from '../api/DeliveryApi';

export default function DeliveryDetailScreen({ route, navigation }) {
  const { deliveryData } = route.params;
  const { assingDelivery } = useDeliveryApi();

  const handleAccept = async () => {
    try {
      const response = await assingDelivery(deliveryData.deliveryId);
      Alert.alert('Éxito', 'Pedido asignado correctamente');
      navigation.navigate('Home', {
        screen: 'InProgress',
      });
          } catch (error) {
      Alert.alert('Error', `No se pudo asignar el pedido: ${error}`);
      navigation.navigate('Home', {
        screen: 'InProgress',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Pedido</Text>
      <Text>ID de entrega: {deliveryData.deliveryId}</Text>
      <Text>Cliente: {deliveryData.client}</Text>
      <Text>Dirección: {deliveryData.address}</Text>
      <Text>Ubicación del paquete: {deliveryData.packageLocation}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Quiero este pedido" onPress={handleAccept} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 40,
  },
});
