export class User {
    id: number;
    login: string;
    username: string;
    password: string;
    salt: string;
    token: string;
    tokenValidity: Date;
    role: string;
    isActive: boolean;
    IP_ADDR: any;
    FK_Customer: number;
}