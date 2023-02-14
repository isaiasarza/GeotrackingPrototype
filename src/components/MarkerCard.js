import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  INNER_CARD_HEIGHT,
  INNER_CARD_WIDTH,
  OUTER_CARD_HEIGHT,
  OUTER_CARD_WIDTH,
} from '../utils/constants';

import {ServiceOrderDTO, SERVICE_ORDER_DESCRIPTION, SERVICE_ORDER_STATUS} from '../shared/dto/ServiceOrderDTO';

import Icon from 'react-native-vector-icons/FontAwesome';

//import Icon from 'react-native-vector-icons/EvilIcons'



const MarkerCard = ({serviceOrder, onClose}) => {
  const { number, description, serviceType, serviceSubType, status } = serviceOrder;
  const { firstname, lastname } = serviceOrder?.customerInformation;
  const { areaCode, phoneNumbe } = serviceOrder?.customerInformation?.telephones[0];
  const { streetName, streetNumber } = serviceOrder?.destination;
  const { statusDescription, statusColor, statusIcon  } = SERVICE_ORDER_STATUS[status];
  return (
    <View style={styles.outerCard}>
      <View style={styles.innerCard}>
        <View style={styles.right}>
          <View style={styles.top}>
            <Text numberOfLines={1} style={styles.name}>
              {`Orden de Servicio #${number}`}              
            </Text>
            <Pressable onPress={onClose}><Icon name="close" size={15}/></Pressable>      
          </View>
          <View style={styles.bottom}>
            <Text numberOfLines={2} style={styles.status}>
              Solicitante del Servicio:
              <Text style={styles.black}>{`${firstname} ${lastname}`}</Text>
            </Text>
            <Text numberOfLines={2} style={styles.status}>
              Tipo de Servicio:{' '}
              <Text style={styles.black}>{serviceType}</Text>
            </Text>
            <Text numberOfLines={2} style={styles.status}>
              Estado del Servicio:
              <Text style={styles.black}>{statusDescription}</Text>
              <View><Icon name={statusIcon} color={statusColor} size={15}/></View>
            </Text>
            <Text style={styles.status} numberOfLines={1}>
              Teléfono: <Text style={styles.black}>{`${areaCode}-${phoneNumbe}`}</Text>
            </Text>
            <Text style={styles.status} numberOfLines={2}>
              Dirección: <Text style={styles.black}>{`${streetName} ${streetNumber}`} </Text>
            </Text>
            <Text numberOfLines={4} style={styles.status}>
              Observaciones:
              <Text style={styles.black}>
                { description }
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerCard: {
    flex: 1,
    height: OUTER_CARD_HEIGHT,
    width: OUTER_CARD_WIDTH,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  innerCard: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: INNER_CARD_HEIGHT,
    width: INNER_CARD_WIDTH,
    overflow: 'hidden',
    elevation: 6,
    padding: 10,
  },
  right: {flex: 1, paddingLeft: 10, alignItems: 'flex-start'},
  top: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  name: {fontSize: 14.5},
  bottom: {flex: 1, alignItems: 'flex-start', justifyContent: 'space-between',},
  status: {
    fontSize: 11,
    color: 'grey',
    marginVertical: 1,
  },
  black: {color: 'black'},
});

export default memo(MarkerCard);
