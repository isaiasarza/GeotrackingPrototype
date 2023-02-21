import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {
  ServiceOrderDTO,
  SERVICE_ORDER_ICON,
  SERVICE_ORDER_STATUS,
} from '../shared/dto/ServiceOrderDTO';
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
import {NAVIGATION_ROUTES} from '../utils/constants';

import Icon from 'react-native-vector-icons/Ionicons';

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
            const {number, status} = serviceOrder;
            const {statusDescription, statusColor} = SERVICE_ORDER_STATUS[
              status
            ];

            const title = `Parada #${key + 1}`;
            const description = `Orden #${number}`

            const markerIcon =
              currentServiceOrder?.number == number
                ? 'location'
                : 'location-outline';

            const zIndex =
              currentServiceOrder?.number == number
                ? 1
                : 0;
            return (
              <Marker
                key={key}
                title={title}
                description={description}
                coordinate={coordinate}
                pinColor={statusColor}
                onPress={() => setCurrentServiceOrder(serviceOrder)}
              >
              </Marker>
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
            onCancel={() =>
              navigation.navigate(NAVIGATION_ROUTES.CANCEL_DELIVERY_MODAL, {
                serviceOrder: currentServiceOrder,
              })
            }
            onConfirm={() =>
              navigation.navigate(NAVIGATION_ROUTES.CONFIRM_DELIVERY_MODAL, {
                serviceOrder: currentServiceOrder,
              })
            }
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
    width: '100%',
    height: '100%',
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
