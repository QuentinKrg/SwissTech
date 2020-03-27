export class User {
    id: number;
    login: string;
    username: string;
    password: string;
    salt: string;
    token: string;
    tokenValidity: Date;
    role: string;
    FK_Customer: number;
}