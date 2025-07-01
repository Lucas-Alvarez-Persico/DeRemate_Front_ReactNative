import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import useAuthService from '../api/AuthApi';
import LottieView from 'lottie-react-native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const animationRef = useRef(null);
  const { registerMail } = useAuthService();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const showAlert = (message) => {
    Alert.alert('Deremate', message);
  };

  const handleRegister = async () => {
    if (!nombre || !email || !contrasena) {
      showAlert('Completa todos los campos');
      return;
    }

    setLoading(true);

    const user = {
      name: nombre,
      username: email,
      password: contrasena,
      role: 'ADMIN',
    };

    try {
      await registerMail(user);
      setSuccess(true); // solo si fue exitoso
      animationRef.current?.play();

      setTimeout(() => {
        navigation.replace('RegisterValidateCodeScreen', { username: email });
      }, 2500);
    } catch (error) {
      showAlert(error?.message || 'Ocurrió un error al registrar');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={animationRef}
          source={require('../../assets/animations/mailSent.json')}
          autoPlay
          loop={false}
          style={{ width: 250, height: 250 }}
        />
        <Text style={styles.successText}>¡Correo enviado con éxito!</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Registrando usuario...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#7C4DFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.register}>Register</Text>
            <Text style={styles.bienvenido}>
              ¡Crea tu cuenta y forma parte de este proyecto!
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#6200ea"
              onChangeText={setNombre}
              value={nombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#6200ea"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#6200ea"
              secureTextEntry
              onChangeText={setContrasena}
              value={contrasena}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.goBackText}>
                ¿Ya tienes cuenta? Inicia sesión
              </Text>
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
    padding: 10,
  },
  register: {
    fontSize: 40,
    color: '#6200ea',
    fontWeight: 'bold',
    marginTop: 0,
  },
  bienvenido: {
    fontSize: 24,
    color: '#6200ea',
    marginTop: 8,
    paddingBottom: 80,
  },
  box: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 20,
    marginTop: 150,
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    borderColor: '#6200ea',
    borderWidth: 1,
    marginBottom: 10,
    color: '#6200ea',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#6200ea',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  goBackText: {
    color: '#7C4DFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7C4DFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7C4DFF',
  },
  successText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
