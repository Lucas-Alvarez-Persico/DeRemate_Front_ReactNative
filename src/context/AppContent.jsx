// AppContent.js
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported',
  '[expo-notifications]: `shouldShowAlert` is deprecated',
]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AppContent({ children }) {
  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener(notification => {
      // Aquí podrías mostrar algo si querés
    });

    return () => {
      sub.remove();
    };
  }, []);

  return <>{children}</>;
}
