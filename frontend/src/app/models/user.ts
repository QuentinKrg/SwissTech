export class User {
    id: number;
    login: string;
    password: string;
    salt: string;
    token: string;
    tokenValidity: Date;
}