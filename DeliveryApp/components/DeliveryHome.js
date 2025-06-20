// components/DeliveryHome.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';

export default function DeliveryHome({ navigation }) {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const ref = database().ref('/orders');

    const listener = ref.on('value', snapshot => {
      const orders = snapshot.val();
      if (orders) {
        const filtered = Object.entries(orders)
          .filter(([_, val]) => val.status === 'pending')
          .map(([key, val]) => ({ key, ...val }));
        setPendingOrders(filtered);
      }
    });

    return () => ref.off('value', listener);
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const acceptAndTrack = async (orderId) => {
    const allowed = await requestLocationPermission();
    if (!allowed) {
      Alert.alert('Location permission denied');
      return;
    }

    // Update status
    await database().ref(`/orders/${orderId}/status`).set('accepted');

    // Start live location tracking
    Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log("Live location sent:", latitude, longitude);
        database().ref(`/orders/${orderId}/liveLocation`).set({
          lat: latitude,
          lng: longitude,
        });
      },
      error => {
        console.error('Tracking error:', error);
        Alert.alert('Failed to get location');
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 3000,
      }
    );

    // Navigate to map
    navigation.navigate('DeliveryMap', { orderId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Pending Orders</Text>
      <FlatList
        data={pendingOrders}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => acceptAndTrack(item.key)}
          >
            <Text style={styles.text}>🆔 Order ID: {item.key}</Text>
            <Text style={styles.text}>🏪 Restaurant: {item.restaurantName || 'N/A'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2196F3',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
  },
});
