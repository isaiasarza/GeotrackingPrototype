/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from './src/screens/WelcomeScreen';
import {RouteScreen} from './src/screens/RouteScreen';
import {ServiceOrdersDetailScreen} from './src/screens/ServiceOrderDetailScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Route" component={RouteScreen} />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="ServiceOrdersDetailModal" component={ServiceOrdersDetailScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
