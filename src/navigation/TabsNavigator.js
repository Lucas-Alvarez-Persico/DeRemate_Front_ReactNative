import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrdersScreen from '../screens/OrdersScreen';
import InProgressScreen from '../screens/InProgressScreen';
import HistoryScreen from '../screens/HistoryScreen';
import UserScreen from '../screens/UserScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 65,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === 'Orders') iconName = 'view-list';
          else if (route.name === 'InProgress') iconName = 'truck-delivery-outline';
          else if (route.name === 'History') iconName = 'file-document-outline';
          else if (route.name === 'User') iconName = 'account-outline';

          return <Icon name={iconName} size={26} color={focused ? '#6200ea' : '#999'} />;
        },
        tabBarActiveTintColor: '#6200ea',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Orders" component={OrdersScreen} options={{ title: 'Órdenes' }} />
      <Tab.Screen name="InProgress" component={InProgressScreen} options={{ title: 'En Curso' }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Historial' }} />
      <Tab.Screen name="User" component={UserScreen} options={{ title: 'Usuario' }} />

    </Tab.Navigator>
  );
}
