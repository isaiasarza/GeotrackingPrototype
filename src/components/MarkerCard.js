import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  INNER_CARD_HEIGHT,
  INNER_CARD_WIDTH,
  OUTER_CARD_HEIGHT,
  OUTER_CARD_WIDTH,
} from '../utils/constants';

import {
  ServiceOrderDTO,
  SERVICE_ORDER_DESCRIPTION,
  SERVICE_ORDER_STATUS,
} from '../shared/dto/ServiceOrderDTO';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Chip} from '@rneui/base';

const MarkerCard = ({serviceOrder, onCancel, onConfirm, onClose}) => {
  const {
    number,
    description,
    serviceType,
    serviceSubType,
    status,
  } = serviceOrder;
  const {firstname, lastname} = serviceOrder?.customerInformation;
  const {
    areaCode,
    phoneNumbe,
  } = serviceOrder?.customerInformation?.telephones[0];
  const {streetName, streetNumber} = serviceOrder?.destination;
  const {statusDescription, statusColor, statusIcon} = SERVICE_ORDER_STATUS[
    status
  ];
  return (
    <View style={styles.outerCard}>
      <View style={styles.innerCard}>
        <View style={styles.right}>
          <View style={styles.top}>
            <Text numberOfLines={1} style={styles.name}>
              {`Orden de Servicio #${number}`}
            </Text>
            <Pressable onPress={onClose}>
              <Icon name="close" size={15} />
            </Pressable>
          </View>
          <View style={styles.bottom}>
            <View>
              <Chip
                title={statusDescription}
                icon={{
                  name: statusIcon,
                  type: 'font-awesome',
                  size: 15,
                  color: 'white',
                }}
                iconRight
                titleStyle={styles.status.titleStyle}
                buttonStyle={{
                  ...styles.status.buttonStyle,
                  backgroundColor: statusColor,
                }}
                containerStyle={styles.status.containerStyle}
              />
            </View>
            <Text numberOfLines={2} style={styles.text}>
              Solicitante:{' '}
              <Text style={styles.black}>{`${firstname} ${lastname}`}</Text>
            </Text>
            <Text numberOfLines={2} style={styles.text}>
              Tipo de Servicio: <Text style={styles.black}>{serviceType}</Text>
            </Text>

            <Text style={styles.text} numberOfLines={1}>
              Teléfono:{' '}
              <Text style={styles.black}>{`${areaCode}-${phoneNumbe}`}</Text>
            </Text>
            <Text style={styles.text} numberOfLines={2}>
              Dirección:{' '}
              <Text style={styles.black}>
                {`${streetName} ${streetNumber}`}{' '}
              </Text>
            </Text>
            <Text numberOfLines={4} style={styles.text}>
              Observaciones: <Text style={styles.black}>{description}</Text>
            </Text>
            <View style={styles.buttonsContainer}>
              <Button
                titleStyle={styles.buttonsContainer.titleButton}
                buttonStyle={styles.buttonsContainer.cancelButton}
                title="Cancelar Visita"
                onPress={() => onCancel()}
              ></Button>
              <Button
                titleStyle={styles.buttonsContainer.titleButton}
                buttonStyle={styles.buttonsContainer.confirmButton}
                title="Confirmar Visita"
                onPress={() => onConfirm()}
              ></Button>
            </View>
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
    justifyContent: 'center',
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
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  name: {fontSize: 16.5},
  bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  status: {
    titleStyle: {
      fontSize: 12.5,
      fontWeight: 'bold',
      color: 'white',
    },
    buttonStyle: {
      borderRadius: 16,
      height: 32,
    },
    containerStyle: {
      marginTop: 2,
    },
  },
  text: {
    fontSize: 11,
    marginVertical: 1,
    color: 'grey',
  },
  black: {color: 'black', textAlign: 'right'},
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    titleButton: {
      fontSize: 12.5,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#A6A033',
      borderRadius: 16,
      height: 32,
    },
    confirmButton: {
      backgroundColor: '#5C881A',
      borderRadius: 16,
      height: 32,
    },
  },
});

export default memo(MarkerCard);
