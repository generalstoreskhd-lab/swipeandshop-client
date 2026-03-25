import { PaymentMethod } from "./models";

export interface Geolocation {
    latitude: number;
    longitude: number;
}

export interface ClientUser {
    id?: string;
    name: string;
    phoneNumber: string;
    address: string;
    location?: Geolocation;
    savedPaymentMethods?: PaymentMethod[];
}
