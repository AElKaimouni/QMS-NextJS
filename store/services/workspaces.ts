import { Workspace } from '@/types/workspace';
import { api } from './api';

type CreateWorkspace = {
    title: string;
    businessName?: string;
    businessIndustry?: string;
    contactEmail?: string;
    contactPhone?: string;
};

type UpdateWorkspace = {
    id: number;
    data: {
        title?: string;
        businessName?: string;
        businessIndustry?: string;
        contactEmail?: string;
        contactPhone?: string;
    };
};

const workspaceSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getWorkspace: build.query<Workspace, any>({
            query: ({ id }) => `/workspaces/${id}`,
            providesTags: ['workspace'],
        }),
        getAllWorkspaces: build.query<Workspace[], any>({
            query: () => `/workspaces/all`,
            providesTags: ['workspace'],
        }),
        createWorkspace: build.mutation<any, CreateWorkspace>({
            query: (data) => ({
                url: `/workspaces`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['workspace'],
        }),
        updateWorkspace: build.mutation<any, UpdateWorkspace>({
            query: ({ id, data }) => ({
                url: `/workspaces/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['workspace'],
        }),
        deleteWorkspace: build.mutation<any, any>({
            query: ({ id }) => ({
                url: `/workspaces/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['workspace'],
        }),
    }),
});

export const { useGetWorkspaceQuery, useLazyGetWorkspaceQuery, useGetAllWorkspacesQuery, useCreateWorkspaceMutation, useUpdateWorkspaceMutation, useDeleteWorkspaceMutation } = workspaceSlice;
