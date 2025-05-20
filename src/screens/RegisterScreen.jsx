import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import UserService from '../api/AuthApi';


export default function RegisterScreen() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

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
console.log('Nombre:', nombre);
  const user = {
    name : nombre,
    username: email,
    password: contrasena,
    role: 'ADMIN',
  };
console.log('Usuario:', user);
  try {
    console.log('Registrando usuario...');
    await UserService.registerMail(user);
    showAlert('Cuenta registrada exitosamente. Revisa tu correo.');
    navigation.replace('RegisterValidateCodeScreen', { username: email });
  } catch (error) {
    showAlert(error || 'Ocurrió un error al registrar');
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#7C4DFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <View style={styles.container}>
          

          <View style={styles.box}>
          <Text style={styles.register}>Register</Text>
          <Text style={styles.bienvenido}>Crea tu cuenta y forma parte de este proyecto!</Text>

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

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.goBackText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    fontWeight: '',
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
    position: 'relative',
  },
  registerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#7C4DFF',
    marginLeft: 10,
    marginBottom: 16,
    position: 'absolute',
    top: 16,
    left: 16,
  },
  image: {
    width: 180,
    height: 180,
    position: 'absolute',
    top: -70,
    right: 16,
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
});
