// screens/ValidateCodeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import UserService from '../api/AuthApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodeValidationForm from '../components/CodeValidationForm';

export default function RegisterValidateCodeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

const handleValidate = async ({ username, code }) => {
  const cleanedCode = code.trim();
  console.log('Username:', username);
  console.log('Cleaned Code:', cleanedCode);

  try {
    const data = await UserService.register({ username, code: cleanedCode });
    console.log('Data:', data);
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', error);
  }
};


  return (
    <View style={styles.container}>
      <CodeValidationForm
        username={username}
        onValidate={handleValidate}
        title="Ingresar código de verificación"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
  },
});
