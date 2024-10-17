import { api } from './api';
import { LoginDTO, LoginResponseDTO, RegisterDTO } from '@/types/users';

const userSlice = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponseDTO, LoginDTO>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body
            }),
        }),
        register: build.mutation<{}, RegisterDTO>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body
            }),
        })
    }),
});

export const { useLoginMutation, useRegisterMutation } = userSlice;
