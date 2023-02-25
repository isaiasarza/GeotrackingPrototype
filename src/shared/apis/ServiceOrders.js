import Config from 'react-native-config';

export const getServiceOrders = () => {
    return fetch(`http://vps-3107443-x.dattaweb.com/tracking-so/orders`)
    .then(response => response.json())
}