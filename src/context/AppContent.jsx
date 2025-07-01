import React, { useEffect, useRef, useContext } from 'react';
import * as Notifications from 'expo-notifications';
import { LogBox } from 'react-native';
import NotificationApi from '../api/NotificationApi';
import { AuthContext } from './AuthContext';

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
    if (isAuthenticated !== true) return;

    const sub = Notifications.addNotificationReceivedListener(notification => {
    });

    const fetchNotifications = async () => {
      try {
        const notificaciones = await getUnreadNotifications();
        if (notificaciones.length > 0) {
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
      }
    };

    intervalRef.current = setInterval(fetchNotifications, 10000);
    fetchNotifications();

    return () => {
      sub.remove();
      clearInterval(intervalRef.current);
    };
  }, [isAuthenticated]);

  return <>{children}</>;
}
