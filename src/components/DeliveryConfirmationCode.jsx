import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import useDeliveryService from '../api/DeliveryApi';
import { useNavigation } from '@react-navigation/native';


export default function DeliveryConfirmationCode({ deliveryId, onConfirmed }) {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { completeDelivery } = useDeliveryService();
  const navigation = useNavigation();

  const open = () => {
    setCode('');
    setError(null);
    setVisible(true);
  };

  const close = () => setVisible(false);

  const handleConfirm = async () => {
    if (code.length !== 3) {
      setError('El código debe tener 3 dígitos');
      return;
    }
    setLoading(true);
    try {
      await completeDelivery(deliveryId, code);
      setVisible(false);
      onConfirmed && onConfirmed();
      Alert.alert(
        'Éxito', 
        'Entrega confirmada correctamente',
        [
            { text: 'OK', onPress: () => navigation.navigate('Home',{screen: 'History'},) }
        ]
      );
    } catch (errMsg) {
      setError(errMsg);
    } finally {
      setLoading(false);
      //navigation.navigate('Home',{screen: 'History'},)
      //navigation.navigate("HistoryScreen");
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={open}>
        <Text style={styles.buttonText}>Confirmar entrega</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={close}
      >
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
});
