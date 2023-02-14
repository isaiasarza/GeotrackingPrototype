import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {ServiceOrderDTO, SERVICE_ORDER_ICON} from '../shared/dto/ServiceOrderDTO';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
  LatLng,
} from 'react-native-maps';

import Config from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';
import {getServiceOrders} from '../../src/shared/apis/ServiceOrders';
import {MapsInfo} from '../../src/shared/interfaces/MapsInfo';
import {getMapsInfo} from '../../src/shared/helper/MapsInfoCast';
import MarkerCard from '../components/MarkerCard';

export const RouteScreen = ({navigation}) => {
  const mapInfoExample = {
    origin: {latitude: -42.7692, longitude: -65.03851},
    destination: {latitude: -42.773038, longitude: -65.05112},
    coordinates: [
      {latitude: -42.7692, longitude: -65.03851},
      {latitude: -42.773038, longitude: -65.05112},
    ],
    waypoints: [],
  };
  const [currentServiceOrder, setCurrentServiceOrder] = useState(null);
  const [serviceOrders, setServiceOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [mapsInfo, setMapsInfo] = useState(mapInfoExample);

  const onMarkerPress = serviceOrder => {
    console.log(serviceOrder);
    setCurrentServiceOrder(serviceOrder);
  };

  const initializeData = async () => {
    try {
      const serviceOrders = await getServiceOrders();
      setServiceOrders(serviceOrders);
      setMapsInfo(getMapsInfo(serviceOrders));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY ?? '';
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading data</Text>
      ) : (
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
            const serviceOrder: ServiceOrderDTO = serviceOrders[key];
            const {status} = serviceOrder;
            const pinColor = SERVICE_ORDER_ICON[status];
            return (
              <Marker
                key={key}
                coordinate={coordinate}
                pinColor={pinColor}
                onPress={() => setCurrentServiceOrder(serviceOrder)}
              ></Marker>
            );
          })}

          <MapViewDirections
            origin={mapsInfo.origin}
            destination={mapsInfo.destination}
            waypoints={mapsInfo.waypoints}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeColor={'#5c881a'}
            strokeWidth={4}
          />
        </MapView>
      )}
      {currentServiceOrder && (
        <View style={styles.centeredView}>
          <MarkerCard
            serviceOrder={currentServiceOrder}
            onClose={() => setCurrentServiceOrder(null)}
          ></MarkerCard>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    bottom: '5%',
    position: 'absolute',
  },
});
