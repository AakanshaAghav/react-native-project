import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantList from './components/RestaurantList';
import OrderScreen from './components/OrderScreen';
import MapScreen from './components/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RestaurantList">
        <Stack.Screen name="RestaurantList" component={RestaurantList} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
