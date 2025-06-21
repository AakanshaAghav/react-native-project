import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import database from '@react-native-firebase/database';

const GOOGLE_MAPS_APIKEY = 'Your_API_Key'; // Replace with a working one

export default function DeliveryMapScreen({ route }) {
  const { orderId } = route.params;
  const [liveLocation, setLiveLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [restaurantLocation, setRestaurantLocation] = useState(null);

  useEffect(() => {
    const ref = database().ref(`/orders/${orderId}`);
    const listener = ref.on('value', snapshot => {
      const order = snapshot.val();

      if (!order) {
        Alert.alert("Order not found");
        return;
      }

      if (order.liveLocation?.lat && order.liveLocation?.lng) {
        setLiveLocation({
          latitude: order.liveLocation.lat,
          longitude: order.liveLocation.lng,
        });
      }

      if (order.customerLocation?.lat && order.customerLocation?.lng) {
        setCustomerLocation({
          latitude: order.customerLocation.lat,
          longitude: order.customerLocation.lng,
        });
      }

      if (order.restaurantLocation?.lat && order.restaurantLocation?.lng) {
        setRestaurantLocation({
          latitude: order.restaurantLocation.lat,
          longitude: order.restaurantLocation.lng,
        });
      }
    });

    return () => ref.off('value', listener);
  }, [orderId]);

  const allReady = liveLocation && restaurantLocation && customerLocation;

  if (!allReady) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: liveLocation.latitude,
        longitude: liveLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* Markers */}
      <Marker coordinate={restaurantLocation} title="🍽 Restaurant" />
      <Marker coordinate={customerLocation} title="🏠 Customer Home" />
      <Marker coordinate={liveLocation} title="🚚 Delivery Guy" pinColor="green" />

      {/* Route: Delivery → Restaurant (if not reached yet) */}
      <MapViewDirections
        origin={liveLocation}
        destination={restaurantLocation}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={4}
        strokeColor="orange"
        mode="DRIVING"
        optimizeWaypoints={true}
      />

      {/* Route: Restaurant → Customer */}
      <MapViewDirections
        origin={restaurantLocation}
        destination={customerLocation}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={4}
        strokeColor="blue"
        mode="DRIVING"
        optimizeWaypoints={true}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
