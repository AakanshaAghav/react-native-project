import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';

export default function OrderScreen({ route, navigation }) {
  const { data } = route.params;

  const orderId = `order_${Date.now()}`;
  const customerLocation = { lat: 19.8824027, lng: 75.3222026 };

  const doOrder = () => {
  database().ref(`/orders/${orderId}`).set({
    restaurantName: data.name, // ✅ Add this at the top level
    restaurantLocation: {
      lat: data.lat,
      lng: data.lng,
    },
    customerLocation,
    status: 'pending',
  });

  navigation.navigate('MapScreen', { orderId });
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>{data.name}</Text>
      <Image
        source={
          data.id === 1
            ? require('../assets/pizza.jpg')
            : require('../assets/burger.jpg')
        }
        style={styles.img}
      />
      <Text style={styles.item}>
        {data.item} ₹{data.price}
      </Text>
      <TouchableOpacity style={styles.btn} onPress={doOrder}>
        <Text style={styles.btnText}>Place Order & Track</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  img: { width: 200, height: 200, borderRadius: 10 },
  item: { fontSize: 18, marginVertical: 20 },
  btn: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
