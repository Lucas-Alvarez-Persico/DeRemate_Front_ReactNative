import React, { useEffect, useRef, useContext } from 'react';
import * as Notifications from 'expo-notifications';
import { LogBox } from 'react-native';
import NotificationApi from '../api/NotificationApi';
import { AuthContext } from './AuthContext'; // <-- Asegurate de importar el AuthContext

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
  const { isAuthenticated } = useContext(AuthContext);
  const { getUnreadNotifications } = NotificationApi();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated !== true) return; // Espera hasta que esté autenticado

    const sub = Notifications.addNotificationReceivedListener(notification => {
      // Si querés hacer algo visual
    });

    const fetchNotifications = async () => {
      try {
        const notificaciones = await getUnreadNotifications();
        if (notificaciones.length > 0) {
          console.log('🔔 Notificaciones nuevas:', notificaciones);
          for (const noti of notificaciones) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: noti.title,
                body: noti.subtitle,
                sound: true,
              },
              trigger: null,
            });
          }
        }
      } catch (err) {
        console.error('❌ Error al obtener notificaciones:', err);
      }
    };

    intervalRef.current = setInterval(fetchNotifications, 10000);
    fetchNotifications(); // Llamada inicial

    return () => {
      sub.remove();
      clearInterval(intervalRef.current);
    };
  }, [isAuthenticated]); // ← Se ejecuta cuando cambia el estado

  return <>{children}</>;
}
