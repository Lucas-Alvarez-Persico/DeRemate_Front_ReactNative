// screens/ValidateCodeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAuthService from '../api/AuthApi';
import CodeValidationForm from '../components/CodeValidationForm';

export default function RegisterValidateCodeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;
  const { register } = useAuthService();

const handleValidate = async ({ username, code }) => {
  const cleanedCode = code.trim();

  try {
    const data = await register({ username, code: cleanedCode });
    navigation.navigate('Login');
  } catch (error) {
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
