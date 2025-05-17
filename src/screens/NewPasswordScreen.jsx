// screens/NewPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import UserService from '../api/AuthApi';

export default function NewPasswordScreen({ route, navigation }) {
  const { username } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await UserService.newPassword({ username, password: newPassword })
      Alert.alert('Éxito', 'Tu contraseña ha sido actualizada');
      navigation.navigate('Login'); // o a donde corresponda
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Error al cambiar contraseña');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#7C4DFF',
  },
  title: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    color: '#6200ea',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
