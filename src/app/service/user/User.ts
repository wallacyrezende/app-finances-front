export interface UserDTO {
    email?: string;
    name?: string;
    password?: string;
    rememberMe?: boolean;
}

export interface User {
    id?: number;
    name?: string;
    email?: string;
}