import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { IRootState } from '..';
import { Queue } from '@/types/queue';
import { Reservation } from '@/types/reservation';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as IRootState).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithRedirect: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        window.location.pathname = '/login';
    }

    return result;
};
type WidgetStats = {
    total_queues: number;
    active_queues: number;
    total_reservations: number;
    yerserday_total_reservations: number;
    last_hour_total_reservations: number;
    total_served_customers: number;
    yerserday_total_served_customers: number;
    last_hour_total_served_customers: number;
};

type HourlyReservation = {
    title: string;
    hour: number;
    reservations_count: number;
    queue_id: string;
};

type QueuePerformance = {
    id: string;
    title: string;
    status: Queue['status']; // Adjust based on possible statuses
    total_reservations: number;
    served_reservations: number;
    avg_total_time: number;
};

type ReservationInfo = {
    phone: string;
    last_name: string;
    first_name: string;
    email: string;
};

type RecentReservation = {
    id: number;
    queueId: string;
    position: number;
    token: string;
    email: string;
    status: Reservation['status']; // Adjust based on possible statuses
    info: ReservationInfo;
    joinAt: string; // ISO date string
    calledAt: string; // ISO date string
    servedAt: string | null; // ISO date string or null
};

type DashboardSummary = {
    widgets: WidgetStats;
    hourly_reservations: HourlyReservation[];
    queues_performance: QueuePerformance[];
    recent_reservations: RecentReservation[];
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithRedirect,
    refetchOnReconnect: true,
    tagTypes: ['auth', 'queue', 'reservation', 'workspace'],
    endpoints: (build) => ({
        getDashboardSummary: build.query<DashboardSummary, void>({
            query: () => ({ url: `/queue-summary/dashboard` }),
        }),
    }),
});

export const { useGetDashboardSummaryQuery } = api
