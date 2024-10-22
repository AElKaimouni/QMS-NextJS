import { api } from './api';
import { Reservation } from '@/types/reservation';

type GetReservationsParams = {
    id: string;
    page: number;
    size: number;
    scope: 'past' | 'current' | 'all';
};

interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

interface PaginatedResponse<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}


const reservationSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getReservations: build.query<PaginatedResponse<Reservation>, GetReservationsParams>({
            query: ({ id, page, size, scope }) => ({ url: `queue/${id}/reservations`, params: { page, size, scope } }),
            providesTags: ['reservation'],
        }),
        createReservation: build.mutation<Reservation, any>({
            query: (body) => ({ url: '/reservations', method: 'POST', body }),
            invalidatesTags: ['reservation'],
        }),
    }),
});

export const { useGetReservationsQuery, useCreateReservationMutation } = reservationSlice;
