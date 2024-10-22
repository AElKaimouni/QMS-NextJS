import { Queue, QueueConsultation, QueueCreation } from '@/types/queue';
import { api } from './api';

type GetQueueParams = {
    id: string;
};

type ConsultQueueParams = {
    id: string;
};

type CallNextInQueueParams = {
    id: string;
};

const queueSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getQueue: build.query<Queue, GetQueueParams>({
            query: ({ id }) => `/queue/${id}`,
            providesTags: ['queue'],
        }),
        createQueue: build.mutation<any, QueueCreation>({
            query: (body) => ({
                url: '/queue',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['queue'],
        }),
        consultQueue: build.query<QueueConsultation, ConsultQueueParams>({
            query: ({ id }) => `/queue/${id}/consult`,
            providesTags: ['queue'],
        }),
        getAllQueues: build.query<Queue[], void>({
            query: () => '/queue/all',
            providesTags: ['queue'],
        }),
        callNextInQueue: build.mutation<void, CallNextInQueueParams>({
            query: ({ id }) => ({ url: `/queue/${id}/next`, method: 'POST' }),
            invalidatesTags: ['reservation', 'queue'],
        }),
    }),
});

export const { useGetQueueQuery, useCreateQueueMutation, useConsultQueueQuery, useGetAllQueuesQuery, useCallNextInQueueMutation } = queueSlice;
