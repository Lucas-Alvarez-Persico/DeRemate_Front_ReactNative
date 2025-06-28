import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import useDeliveryApi from '../api/DeliveryApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import Header from '../components/Header';


export default function DeliveryDetailScreen({ route, navigation }) {
  const { deliveryData } = route.params;
  const { assingDelivery } = useDeliveryApi();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const animationRef = useRef(null);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await assingDelivery(deliveryData.deliveryId);
      setSuccess(true);
      animationRef.current?.play();

      // Redirigir luego de 2.5s
      setTimeout(() => {
        navigation.navigate('Home', {
          screen: 'InProgress',
        });
      }, 2500);
    } catch (error) {
      Alert.alert('Error', `No se pudo asignar el pedido: ${error}`);
      navigation.navigate('Home', {
        screen: 'InProgress',
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={animationRef}
          source={require('../../assets/animations/success.json')} 
          autoPlay
          loop={false}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.successText}>¡Pedido asignado con éxito!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     <Header
      backgroundColor="#7C4DFF"
      iconName="clipboard-text-outline"
      title={`Entrega #${deliveryData.deliveryId}`}
    /> 

    <View style={styles.detailsCard}>
        <Text style={styles.label}>ID de entrega:</Text>
        <Text style={styles.value}>{deliveryData.deliveryId}</Text>

        <Text style={styles.label}>Cliente:</Text>
        <Text style={styles.value}>{deliveryData.client}</Text>

        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{deliveryData.address}</Text>

        <Text style={styles.label}>Ubicación del paquete:</Text>
        <Text style={styles.value}>{deliveryData.packageLocation}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAccept}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="truck-check-outline"
                  size={24}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.acceptButtonText}>Aceptar pedido</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
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
    marginTop: 30,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#7C4DFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  successText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7C4DFF',
  },
});
