import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export default function RecoverPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleRecover = () => {
    if (!email) {
      Alert.alert('Deremate', 'Por favor, ingresa tu correo electrónico');
      return;
    }
    Alert.alert('Deremate', 'Se ha enviado un correo para recuperar tu contraseña');
    // Aquí puedes implementar lógica de recuperación real si tienes backend
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#7C4DFF'}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Recuperar Contraseña</Text>
          <Text style={styles.subtitle}>Ingresa tu correo electrónico</Text>

          <View style={styles.box}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#6200ea"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleRecover}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C4DFF',
    padding: 16,
  },
  backButton: {
    marginTop: 50,
    marginBottom: 10,
    padding: 4,
  },
  title: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 80,
  },
  box: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    borderColor: '#6200ea',
    borderWidth: 1,
    marginBottom: 20,
    color: '#6200ea',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
