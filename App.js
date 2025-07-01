import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigation';
import { AuthProvider } from './src/context/AuthContext';
import AppContent from './src/context/AppContent';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent>
          <StackNavigator />
        </AppContent>
      </NavigationContainer>
    </AuthProvider>
  );
}
