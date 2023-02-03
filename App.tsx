/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE, Circle, LatLng} from 'react-native-maps';

import Config from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';
import { getServiceOrders } from './src/shared/apis/ServiceOrders';
import { MapsInfo } from './src/shared/interfaces/MapsInfo';
import { getMapsInfo } from './src/shared/helper/MapsInfoCast';



function App(): JSX.Element {

  const [isLoading, setLoading] = useState(true);
  const [mapsInfo, setMapsInfo] = useState<MapsInfo>({
    origin: {latitude: -42.7692, longitude: -65.03851},
    destination: {latitude: -42.773038, longitude: -65.05112},
    coordinates: [{latitude: -42.7692, longitude: -65.03851}, {latitude: -42.773038, longitude: -65.05112}],
    waypoints: [],
  })

  const initializeData = async () => {
    try {
      const serviceOrders = await getServiceOrders();
      setMapsInfo(getMapsInfo(serviceOrders))
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY ?? ''; //
  return (
    <View style={styles.container}>
      {
        isLoading ? <Text>Loading data</Text> :
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
        {mapsInfo.coordinates.map((coordinate, key) => {
          return (
            <Marker key={key} coordinate={coordinate} pinColor={'#5c881a'} title={'Parada #' + key} description={'Description'}></Marker>
          );
        })}
        <MapViewDirections
          origin={mapsInfo.origin}
          destination={mapsInfo.destination}
          waypoints={mapsInfo.waypoints}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeColor={'#5c881a'}
        />
      </MapView>
      }
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
