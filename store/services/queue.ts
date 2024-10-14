import { Queue, QueueConsultation } from '@/types';
import { api } from './api';

interface QueueCreate {
    title: string;
    description: string;
}

const queueSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getQueue: build.query<Queue, { id: string }>({
            query: ({ id }) => `/queue/${id}`,
            providesTags: ['queue'],
        }),
        createQueue: build.mutation<any, QueueCreate>({
            query: (body) => ({
                url: '/queue',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['queue'],
        }),
        consultQueue: build.query<QueueConsultation, { id: string }>({
            query: ({ id }) => `/queue/${id}/consult`,
            providesTags: ['queue'],
        }),
    }),
});

export const { useGetQueueQuery, useCreateQueueMutation, useConsultQueueQuery } = queueSlice;
