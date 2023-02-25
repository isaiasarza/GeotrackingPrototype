import {Button} from '@rneui/base';
import {format} from 'date-fns';
import {useState} from 'react';
import {StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {SERVICE_ORDER_STATUS} from '../shared/dto/ServiceOrderDTO';

/**
 * Shows a modal for Service Order Delivery Cancelation.
 * @param {*} param0
 * @returns
 */

export const CancelDeliveryModal = ({route}) => {
  const {serviceOrder} = route.params;
  const {
    number,
    description,
    status,
  } = serviceOrder;
  const {description: serviceType} = serviceOrder?.type;
  const {firstName, lastName, phone} = serviceOrder?.customer;
  const {streetName, streetNumber} = serviceOrder?.destination?.addresses;
  const {statusDescription, statusColor, statusIcon} = SERVICE_ORDER_STATUS[
    status
  ];
  const [cancelationReason, onChangeCancelationReason] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.sectionContainer, styles.shadowProp]}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleContainer.sectionTitle}>
            Info. del Servicio
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.text}>
          Orden de Servicio: <Text style={styles.black}>{number}</Text>
        </Text>
        <Text numberOfLines={2} style={styles.text}>
          Tipo de Servicio: <Text style={styles.black}>{serviceType}</Text>
        </Text>
        <Text numberOfLines={2} style={styles.text}>
          Estado: <Text style={styles.black}>{statusDescription}</Text>
        </Text>
        <Text numberOfLines={4} style={styles.text}>
          Descripción: <Text style={styles.black}>{description}</Text>
        </Text>
      </View>
      <View style={[styles.sectionContainer, styles.shadowProp]}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleContainer.sectionTitle}>
            Info. del Solicitante
          </Text>
        </View>
        <Text style={styles.text}>
          Nombre y Apellido:{' '}
          <Text style={styles.black}>{`${firstName} ${lastName}`}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Teléfono:{' '}
          <Text style={styles.black}>{phone}</Text>
        </Text>
      </View>
      <View style={[styles.sectionContainer, styles.shadowProp]}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleContainer.sectionTitle}>
            Domicilio de Entrega
          </Text>
        </View>
        <Text style={styles.text} numberOfLines={2}>
          Calle: <Text style={styles.black}>{streetName} </Text>
        </Text>
        <Text style={styles.text} numberOfLines={2}>
          Número: <Text style={styles.black}>{streetNumber} </Text>
        </Text>
      </View>
      <View
        style={[styles.sectionContainer, styles.shadowProp, styles.lastSection]}
      >
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleContainer.sectionTitle}>
            Cancelación
          </Text>
        </View>
        <View>
          <Text style={{...styles.text, marginBottom: 4}}>
            Motivo de cancelación
          </Text>
          <TextInput
            autoCorrect={false}
            style={{
              ...styles.input,
              paddingLeft: 12,
              fontSize: 12.5,
              justifyContent: 'center',
              textAlignVertical: 'center',
              fontWeight: 'bold',
            }}
            multiline={true}
            placeholder="Ingrese el motivo de cancelación"
            onChangeText={onChangeCancelationReason}
          />
        </View>

        <View>
          <Text style={{...styles.text, marginBottom: 4}}>
            Fecha y hora de cancelación
          </Text>
          <Button
            titleStyle={{
              color: 'black',
              width: '100%',
              alignItems: 'flex-start',
              textAlign: 'left',
              fontSize: 12.5,
              fontWeight: 'bold',
            }}
            buttonStyle={{
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              padding: 0,
              margin: 0,
            }}
            containerStyle={styles.input}
            title={format(date, 'dd/MM/yyyy HH:mm')}
            onPress={() => setOpen(true)}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <View style={styles.sectionContainer.buttonsContainer}>
          <Button
            titleStyle={styles.sectionContainer.buttonsContainer.titleButton}
            buttonStyle={styles.sectionContainer.buttonsContainer.confirmButton}
            title="Cancelar Visita"
            onPress={() => console.log('onCancel')}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  sectionContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
    buttonsContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
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
  },
  sectionTitleContainer: {
    paddingBottom: 4,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    sectionTitle: {fontSize: 16.5},
  },
  lastSection: {
    flex: 1,
    height: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 4,
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  text: {fontSize: 12.5, marginBottom: 2},
  black: {fontSize: 12.5, fontWeight: 'bold'},
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
