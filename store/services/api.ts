import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRootState } from '..';

const baseQuery = fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as IRootState).auth.token;
        //const token = window.localStorage.getItem("JWT_TOKEN");
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    refetchOnReconnect: true,
    tagTypes: ['auth', "queue"],
    endpoints: () => ({}),
});
