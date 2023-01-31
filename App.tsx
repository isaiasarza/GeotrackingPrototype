/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps';

import Config from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';

function App(): JSX.Element {
  const origin = {latitude: -42.7692, longitude: -65.03851};
  const destination = {latitude: -42.773038, longitude: -65.05112};
  const waypoints = [
    {latitude: -42.784831, longitude: -65.057518},
    {latitude: -42.777933, longitude: -65.065929},
  ];
  const coordinates = [origin, ...waypoints, destination];
  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY ?? ''; //
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        minZoomLevel={14}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -42.7692,
          longitude: -65.03851,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates.map((coordinate, key) => {
          return (
            <Marker coordinate={coordinate} pinColor={'#5c881a'} title={'Parada #' + key} description={'Description'}></Marker>
          );
        })}
        <MapViewDirections
          origin={origin}
          destination={destination}
          waypoints={waypoints}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeColor={'#5c881a'}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    marginLeft: '5%',
    marginTop: '30%',
    width: '90%',
    height: '70%',
    borderRadius: 4,
  },
});

export default App;
