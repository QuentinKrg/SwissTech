export class User {
    id: number;
    username: string;
    password: string;
    salt: string;
    token: string;
    tokenValidity: Date;
    role: string;
}