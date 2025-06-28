import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import useDeliveryService from '../api/DeliveryApi';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function DeliveryConfirmationCode({ deliveryId, onConfirmed }) {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const animationRef = useRef(null);
  const { completeDelivery } = useDeliveryService();
  const navigation = useNavigation();

  const open = () => {
    setCode('');
    setError(null);
    setVisible(true);
    setShowAnimation(false);
  };

  const close = () => {
    if (!loading && !showAnimation) {
      setVisible(false);
    }
  };

  const handleConfirm = async () => {
    if (code.length !== 3) {
      setError('El código debe tener 3 dígitos');
      return;
    }

    setLoading(true);

    try {
      await completeDelivery(deliveryId, code);
      setShowAnimation(true);
      animationRef.current?.play();

      setTimeout(() => {
        onConfirmed && onConfirmed();
        setVisible(false);
        setShowAnimation(false);
        navigation.navigate('Home', { screen: 'History' });
      }, 2500);
    } catch (errMsg) {
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={open}>
        <Text style={styles.buttonText}>Confirmar entrega</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={close}
      >
        {showAnimation ? (
          <View style={styles.fullScreenAnimation}>
            <LottieView
              ref={animationRef}
              source={require('../../assets/animations/packageRecieved.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
            <Text style={styles.successText}>¡Entrega confirmada!</Text>
          </View>
        ) : (
          <View style={styles.backdrop}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Ingresá el código de 3 dígitos</Text>

              <TextInput
                style={styles.input}
                placeholder="###"
                keyboardType="numeric"
                maxLength={3}
                value={code}
                onChangeText={setCode}
                editable={!loading}
              />

              {error && <Text style={styles.modalError}>{error}</Text>}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={close}
                  style={[styles.modalButton, styles.cancelButton]}
                  disabled={loading}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={[styles.modalButton, styles.confirmButton]}
                  disabled={loading}
                >
                  <Text style={styles.confirmText}>
                    {loading ? 'Enviando...' : 'Confirmar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7C4DFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalError: { color: 'red', textAlign: 'center', marginBottom: 8 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: { flex: 1, padding: 10, alignItems: 'center' },
  cancelButton: { marginRight: 10 },
  confirmButton: { backgroundColor: '#7C4DFF', borderRadius: 4 },
  confirmText: { color: '#fff' },

  fullScreenAnimation: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  lottie: {
    width: 400,
    height: 400,
  },
  successText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
