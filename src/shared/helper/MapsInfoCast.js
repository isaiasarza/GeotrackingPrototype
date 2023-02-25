export const getMapsInfo = (serviceOrders: any[]) => {
  const coordinates: LatLng[] = serviceOrders.map(serviceOrder => {
    const {coordinate} = serviceOrder?.destination;
    return coordinate;
  });
  const _length = coordinates.length;
  const origin: LatLng = coordinates[0];
  const destination: LatLng = coordinates[_length - 1];
  let waypoints: any[] = [];
  if (coordinates.length > 2) waypoints = coordinates.slice(1, _length - 1);
  return {origin, destination, waypoints, coordinates};
};
