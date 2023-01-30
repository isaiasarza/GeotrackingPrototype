/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

function App(): JSX.Element {
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
        <Marker
          key={1}
          coordinate={{latitude: -42.7692, longitude: -65.03851}}
          title={'Marker'}
          description={'Description'}
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
