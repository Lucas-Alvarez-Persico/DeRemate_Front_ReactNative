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

export default function LoginScreen() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const showAlert = (message) => {
    Alert.alert('Deremate', message);
  };

  const loginUser = () => {
    if (!usuario || !contrasena) {
      showAlert('Completa todos los campos');
      return;
    }

    if (usuario === 'admin' && contrasena === '1234') {
      showAlert('Bienvenido');
      navigation.replace('Home');
    } else {
      showAlert('Credenciales incorrectas');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.hola}>Hola!</Text>
          <Text style={styles.bienvenido}>Bienvenido a Deremate</Text>

          <View style={styles.box}>
                <Text style={styles.loginTitle}>Login</Text>
                <Image source={require('../../assets/box_closed.png')} style={styles.image} /> 


            <TextInput
              style={styles.input}
              placeholder="Usuario"
              placeholderTextColor="#6200ea"
              onChangeText={setUsuario}
              value={usuario}
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

            <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
              <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Registrarse</Text>
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
      backgroundColor: '#7C4DFF', // violeta1
      padding: 10,
    },
    hola: {
      fontSize: 60,
      color: 'white',
      fontWeight: 'bold',
      marginTop: 32,
    },
    bienvenido: {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
      marginTop: 8,
      paddingBottom: 100,
    },

    box: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 20,
        padding: 20,
        marginTop: 60,
        alignItems: 'flex-start', // alineación al inicio
        paddingTop: 100,          // espacio para que entre la imagen superpuesta
        position: 'relative',
    },
      
    loginTitle: {
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
    forgot: {
      color: '#7C4DFF',
      fontWeight: 'bold',
      marginBottom: 10,
      fontSize: 16,
    },
    loginButton: {
      width: '100%',
      backgroundColor: '#6200ea', // violeta3
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 10,
    },
    registerButton: {
        width: '100%',
        backgroundColor: '#7C4DFF',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
      },
      
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  