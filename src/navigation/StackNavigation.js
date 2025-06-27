import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen';
import ValidateCodeScreen from '../screens/ValidateCodeScreen.jsx';
import NewPasswordScreen from '../screens/NewPasswordScreen'
import RegisterValidateCodeScreen from '../screens/RegisterValidateCodeScreen';
import DeliveryDetailScreen from '../screens/DeliveryDetailScreen';
import TabsNavigator from './TabsNavigator'; // ✅ Importar tu navbar


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      {/* Screens de autenticación */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />

      {/* Screens privadas con Bottom Tabs */}
      <Stack.Screen name="Home" component={TabsNavigator} />

      {/* Otras screens (sin bottom nav) */}
      <Stack.Screen name="DeliveryDetail" component={DeliveryDetailScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="ValidateCodeScreen" component={ValidateCodeScreen} />
      <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
      <Stack.Screen name="RegisterValidateCodeScreen" component={RegisterValidateCodeScreen} />
    </Stack.Navigator>
  );
}
