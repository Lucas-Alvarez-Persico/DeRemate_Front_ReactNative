// components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header({ backgroundColor, iconName, title }) {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <MaterialCommunityIcons name={iconName} size={32} color="white" />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold',
  },
});
