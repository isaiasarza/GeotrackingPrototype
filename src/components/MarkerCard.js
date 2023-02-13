import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  INNER_CARD_HEIGHT,
  INNER_CARD_WIDTH,
  OUTER_CARD_HEIGHT,
  OUTER_CARD_WIDTH,
} from '../utils/constants';

import {ServiceOrderDTO} from '../shared/dto/ServiceOrderDTO';

import Icon from 'react-native-vector-icons/FontAwesome';

const MarkerCard = ({serviceOrder, onClose}) => {
  const { number, description, serviceType, serviceSubType } = serviceOrder;
  const { firstname, lastname } = serviceOrder?.customerInformation;
  const { areaCode, phoneNumbe } = serviceOrder?.customerInformation?.telephones[0];
  const { streetName, streetNumber } = serviceOrder?.destination;
  return (
    <View style={styles.outerCard}>
      <View style={styles.innerCard}>
        <View style={styles.right}>
          <View style={styles.top}>
            <Text numberOfLines={1} style={styles.name}>
              {`Orden de Servicio #${number}`}              
            </Text>
            <Pressable style={styles.icon} onPress={onClose}><Icon name="close" size={15}/></Pressable>      
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
  img: {height: '100%', width: '30%', borderRadius: 6},
  noView: {
    height: '100%',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(200,200,200)',
    borderRadius: 5,
  },
  noTxt: {
    color: 'grey',
    textAlign: 'center',
  },
  right: {flex: 1, paddingLeft: 10, alignItems: 'flex-start'},
  top: {
    position: 'relative',
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  name: {fontSize: 14.5, width: '70%', borderWidth: 2, borderColor: '#000'},
  icon: {width: '10%', borderWidth: 2, borderColor: '#000'},
  bottom: {flex: 1, alignItems: 'flex-start'},
  status: {
    fontSize: 11,
    color: 'grey',
    marginVertical: 1,
  },
  black: {color: 'black'},
});

export default memo(MarkerCard);
