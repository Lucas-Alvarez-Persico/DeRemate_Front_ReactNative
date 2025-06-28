// ✅ QRScreen.js
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Button, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { processQRCode } from '../components/qrCode';

const QRScreen = ({ navigation, route }) => {
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const { expectedDeliveryId } = route.params || {};

  useEffect(() => {
    if (!permission || permission.status !== 'granted') {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setScanned(false);
      setShowCamera(true);
    });
    const blurListener = navigation.addListener('blur', () => {
      setShowCamera(false);
    });

    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation]);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;

    setScanned(true);
    setLoading(true);

    try {
      const result = await processQRCode(data);

      if (expectedDeliveryId && result.deliveryId !== expectedDeliveryId) {
        throw new Error(
          `Este QR no corresponde con el pedido seleccionado (esperado ID: ${expectedDeliveryId}, recibido: ${result.deliveryId})`
        );
      }

      navigation.navigate('DeliveryDetail', { deliveryData: result });
    } catch (error) {
      Alert.alert('Error', error.message, [
        { text: 'Aceptar', onPress: () => setScanned(false) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!permission) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>Solicitando permiso de cámara...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>No hay acceso a la cámara</Text>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {showCamera && (
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Procesando...</Text>
            </View>
          )}
        </CameraView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0008',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
});

export default QRScreen;