export interface User {
    name: string;
    email: string;
    verified: boolean;
}

export interface ResetPassword {
    email: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    token: string;
}
