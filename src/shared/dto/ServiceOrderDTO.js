export interface AssignedDeliveryUser {
  _id: string;
  userId: string;
  firstname: string;
  lastname: string;
}

export interface Telephone {
  countryCode: string;
  areaCode: string;
  phoneNumbe: string;
}

export interface CustomerInformation {
  firstname: string;
  lastname: string;
  telephones: Telephone[];
}

export interface ProductInformation {
  title: string;
  description: string;
}

export interface Destination {
  streetName: string;
  streetNumber: string;
  locality: string;
  state: string;
  country: string;
  referenceInfo: string;
  lat: number;
  long: number;
}

export interface ServiceOrderDTO {
  _id: number;
  number: number;
  serviceOrderCode: string;
  serviceType: string;
  serviceSubType: string;
  priority: string;
  description: string;
  status: string;
  assignedDeliveryUser: AssignedDeliveryUser;
  observations: string;
  creationTime: Date;
  assignedTime: Date;
  estimatedResolutionTime: Date;
  resolutionTime: Date;
  customerInformation: CustomerInformation;
  productInformation: ProductInformation[];
  destination: Destination;
  otherInformation: any[];
}

export const SERVICE_ORDER_STATUS = {
  DONE: {
    code: 'DONE',
    statusDescription: 'Finalizado',
    statusColor: '#A6A033',
    statusIcon: 'check-circle-o',
  },
  CANCELED: {
    code: 'CANCELED',
    statusDescription: 'Cancelado',
    statusColor: '#DB4834',
    statusIcon: 'times-circle-o',
  },
  PENDING: {
    code: 'PENDING',
    statusDescription: 'Pendiente',
    statusColor: '#e7cf3d',
    statusIcon: 'clock-o',
  },
};

export const SERVICE_ORDER_STATUS_CODES = Object.keys(SERVICE_ORDER_STATUS);

export const SERVICE_ORDER_DESCRIPTION = {
  DONE: 'Finalizado',
  CANCELED: 'Cancelado',
  PENDING: 'Pendiente',
};

export const SERVICE_ORDER_ICON = {
  DONE: '#A6A033',
  CANCELED: '#DB4834',
  PENDING: '#e7cf3d',
};
