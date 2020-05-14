export class Customer {
    id_user:number;
    id_customer: number;
    FK_Title: number;
    CustomerName: string;
    CustomerLastName: string;
    CustomerBirthday: Date;
    id_Address:number;
    FullName: string;
    shippingID: number;
    shippingAddress: string;
    shippingCity: string;
    shippingZip: number;
    billingID: number;
    billingAddress: string;
    billingCity: string;
    billingZip: number;
    checkbox_address: boolean;
    Username: string;
    password: string;
    CustomerEmail: string;
    CustomerPhone: string;
    CustomerSince:Date;
    isActive: number;
    IpAddress:string;
    LockedBy: string;
}