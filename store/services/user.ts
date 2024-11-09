import { api } from './api';
import { LoginDTO, LoginResponseDTO, RegisterDTO, User, ResetPassword } from '@/types/users';

const userSlice = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponseDTO, LoginDTO>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),
        register: build.mutation<{}, RegisterDTO>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
        }),
        getUser: build.query<User, void>({
            query: () => '/auth',
        }),
        resetPassword: build.mutation<void, ResetPassword>({
            query: (body) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery, useResetPasswordMutation } = userSlice;
