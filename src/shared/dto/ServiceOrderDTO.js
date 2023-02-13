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