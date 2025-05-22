import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigation';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </AuthProvider>

  );
}
