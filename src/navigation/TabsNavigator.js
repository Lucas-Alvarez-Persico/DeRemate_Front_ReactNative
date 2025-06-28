import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrdersScreen from '../screens/OrdersScreen';
import InProgressScreen from '../screens/InProgressScreen';
import HistoryScreen from '../screens/HistoryScreen';
import UserScreen from '../screens/UserScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 75,
          paddingBottom: 10,
          paddingTop: 5,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;

          switch (route.name) {
            case 'Orders':
              iconName = 'view-list';
              iconColor = focused ? '#6200ea' : '#999';
              break;
            case 'InProgress':
              iconName = 'truck-delivery-outline';
              iconColor = focused ? '#6200ea' : '#999';
              break;
            case 'History':
              iconName = 'file-document-outline';
              iconColor = focused ? '#FFD93D' : '#999';
              break;
            case 'User':
              iconName = 'account-outline';
              iconColor = focused ? '#FFD93D' : '#999';
              break;
            default:
              iconName = 'circle';
              iconColor = '#999';
          }

          return <Icon name={iconName} size={30} color={iconColor} />;
        },
        tabBarLabel: ({ focused }) => {
          let label;
          let labelColor;

          switch (route.name) {
            case 'Orders':
              label = 'Órdenes';
              labelColor = focused ? '#6200ea' : '#999';
              break;
            case 'InProgress':
              label = 'En Curso';
              labelColor = focused ? '#6200ea' : '#999';
              break;
            case 'History':
              label = 'Historial';
              labelColor = focused ? '#FFD93D' : '#999';
              break;
            case 'User':
              label = 'Usuario';
              labelColor = focused ? '#FFD93D' : '#999';
              break;
            default:
              label = '';
              labelColor = '#999';
          }

          return <Text style={{ fontSize: 12, color: labelColor }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="InProgress" component={InProgressScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}
