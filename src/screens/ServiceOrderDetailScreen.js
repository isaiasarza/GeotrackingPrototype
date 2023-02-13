import {Text, ToastAndroid, View} from 'react-native';

export const ServiceOrdersDetailScreen = ({route}) => {
  const {serviceOrder, number} = route.params;
  const title = `Parada #${number} - Orden de servicio #${serviceOrder.serviceOrderCode}`;
  const description = `${serviceOrder.destination.streetName} - ${serviceOrder.destination.streetNumber}\n${serviceOrder?.destination?.referenceInfo}`;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};
