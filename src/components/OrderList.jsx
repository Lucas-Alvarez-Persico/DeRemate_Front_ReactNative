// components/OrderList.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// components/OrderList.js
export default function OrderList({ data = [], renderTitle, renderSubtitle }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {data.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{renderTitle(item)}</Text>
          <Text style={styles.subtitle}>{renderSubtitle(item)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  orderTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  orderAddress: {
    fontSize: 14,
    color: '#333',
  },
});
