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
import { CancelDeliveryModal } from './src/modals/CancelDeliveryModal';
import { ConfirmDeliveryModal } from './src/modals/ConfirmDeliveryModal';
import { NAVIGATION_ROUTES } from './src/utils/constants';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Route" component={RouteScreen} />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name={NAVIGATION_ROUTES.CANCEL_DELIVERY_MODAL}
            options={{title: 'Cancelar Visita'}}
            component={CancelDeliveryModal}
          />
          <Stack.Screen
            name={NAVIGATION_ROUTES.CONFIRM_DELIVERY_MODAL}
            options={{title: 'Confirmar Visita'}}
            component={ConfirmDeliveryModal}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
