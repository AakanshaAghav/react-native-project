import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import database from '@react-native-firebase/database';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAohVcPJubpemVx-1Eazhh_Fjbsuab70rc'; // Replace with your actual API key

export default function MapScreen({ route }) {
  const { orderId } = route.params;

  const [restaurantLocation, setRestaurantLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  useEffect(() => {
    const orderRef = database().ref(`/orders/${orderId}`);

    const listener = orderRef.on('value', snapshot => {
      const order = snapshot.val();

      if (order?.deliveryLocation?.lat && order?.deliveryLocation?.lng) {
        setRestaurantLocation({
          latitude: order.deliveryLocation.lat,
          longitude: order.deliveryLocation.lng,
        });
      }

      if (order?.customerLocation?.lat && order?.customerLocation?.lng) {
        setCustomerLocation({
          latitude: order.customerLocation.lat,
          longitude: order.customerLocation.lng,
        });
      }

      if (order?.liveLocation?.lat && order?.liveLocation?.lng) {
        setDeliveryLocation({
          latitude: order.liveLocation.lat,
          longitude: order.liveLocation.lng,
        });
      }
    });

    return () => orderRef.off('value', listener);
  }, [orderId]);

  if (!restaurantLocation || !customerLocation) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: customerLocation.latitude,
          longitude: customerLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Customer Marker */}
        <Marker
          coordinate={customerLocation}
          title="Customer"
          description="Delivery Destination"
        />

        {/* Restaurant Marker */}
        <Marker
          coordinate={restaurantLocation}
          title="Restaurant"
          description="Order Source"
          pinColor="orange"
        />

        {/* Delivery Person Marker (Live) */}
        {deliveryLocation && (
          <Marker
            coordinate={deliveryLocation}
            title="Delivery Guy"
            description="Live Location"
            pinColor="green"
          />
        )}

        {/* Route: Restaurant to Customer */}
        <MapViewDirections
          origin={restaurantLocation}
          destination={customerLocation}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="purple"
        />

        {/* Route: Delivery Guy to Customer */}
        {deliveryLocation && (
          <MapViewDirections
            origin={deliveryLocation}
            destination={customerLocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
