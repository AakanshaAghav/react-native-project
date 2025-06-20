import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const restaurants = [
  { id: 1, name: "Domino's", lat: 19.8800622, lng: 75.3236967, item: 'Pizza', price: 199 },
  { id: 2, name: 'BrewBurg', lat: 19.8662144, lng: 75.3288101, item: 'Burger', price: 149 },
];

export default function RestaurantList({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose a Restaurant</Text>
      {restaurants.map(r => (
        <TouchableOpacity key={r.id} style={styles.card} onPress={() => navigation.navigate('OrderScreen', { data: r })}>
          <Text style={styles.name}>{r.name}</Text>
          <Text style={styles.item}>{r.item} — ₹{r.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%', marginBottom: 15, elevation: 4 },
  name: { fontSize: 18, fontWeight: 'bold' },
  item: { fontSize: 16, marginTop: 5 },
});