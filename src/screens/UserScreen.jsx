import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AuthApi from '../api/AuthApi';

export default function UserScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await AuthApi.getProfile();
        setUser(profile);
      } catch (error) {
        Alert.alert('Error', error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD93D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="account" size={50} color="#fff" />
        <Text style={styles.headerText}>Hola, {user?.name || 'Usuario'}!</Text>
      </View>

      {/* Cuerpo */}
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.label}>
            <Text style={styles.bold}>Nombre: </Text>{user?.name}
          </Text>
          <Text style={styles.label}>
            <Text style={styles.bold}>Email: </Text>{user?.username}
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
            <Icon name="logout" size={20} color="#c62828" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFD93D',
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 10,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  body: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#c62828',
    fontWeight: 'bold',
    marginRight: 8,
  },
});
