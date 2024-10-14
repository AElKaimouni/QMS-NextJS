import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRootState } from '@/store/index';

const dev = process.env.NODE_ENV === 'development';

const baseUrl = dev ? 'http://localhost:8000' : '';

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as IRootState).auth.token;
        if (token) {
            headers.set('authentication', `Bearer ${token}`);
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
