// screens/ValidateCodeScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAuthService from '../api/AuthApi';
import * as SecureStore from 'expo-secure-store'; 
import CodeValidationForm from '../components/CodeValidationForm';

export default function ValidateCodeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;
  const { recover } = useAuthService();

  const handleValidate = async ({ username, code }) => {
    const data = await recover({ username, code });
    await SecureStore.setItemAsync('recover_token', data);
    navigation.navigate('NewPasswordScreen', { username });
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