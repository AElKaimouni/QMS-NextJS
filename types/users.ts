export interface User {
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