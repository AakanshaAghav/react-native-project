import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeliveryHome from './components/DeliveryHome';
import DeliveryMapScreen from './components/DeliveryMapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DeliveryHome">
        <Stack.Screen name="DeliveryHome" component={DeliveryHome} />
        <Stack.Screen name="DeliveryMap" component={DeliveryMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
