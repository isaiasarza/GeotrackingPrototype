import Config from 'react-native-config';

export const getServiceOrders = () => {
    return fetch(`${Config.SERVICE_ORDER_ENDPOINT}`)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}