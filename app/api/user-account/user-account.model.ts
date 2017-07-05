export interface UserAccount {
    id?: number;
    username: string;
    email: string;
    password?: string; // using SHA512
}
