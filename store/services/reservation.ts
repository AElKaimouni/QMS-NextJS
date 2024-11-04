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

interface CreateReservationBody {
    queueId: string;
    email: string;
    info?: Record<string, string>;
}

type ConsultReservationParams = {
    id: string;
    reservation_token: string;
};

interface ConsultReservation {
    queueTitle: string;
    position: number;
    counter: number;
    estimatedWaitTime: number;
}

const reservationSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getReservations: build.query<PaginatedResponse<Reservation>, GetReservationsParams>({
            query: ({ id, page, size, scope }) => ({ url: `queue/${id}/reservations`, params: { page, size, scope } }),
            providesTags: ['reservation'],
        }),
        createReservation: build.mutation<Reservation, CreateReservationBody>({
            query: (body) => ({ url: '/reservations', method: 'POST', body }),
            invalidatesTags: ['reservation'],
        }),
        consultReservation: build.query<ConsultReservation, ConsultReservationParams>({
            query: ({ id, reservation_token }) => ({ url: `/reservations/${id}/consult?token=${encodeURIComponent(reservation_token)}` }),
        }),
        downloadPDFReservation: build.query<Blob, ConsultReservationParams>({
            query: ({ id, reservation_token }) => ({
                url: `/reservations/${id}/generate-pdf?token=${encodeURIComponent(reservation_token)}`,
                responseHandler: async (response) => {
                    return await response.blob();
                },
                cache: 'no-store',
            }),
        }),
    }),
});

export const { useGetReservationsQuery, useCreateReservationMutation, useConsultReservationQuery, useLazyDownloadPDFReservationQuery } = reservationSlice;
