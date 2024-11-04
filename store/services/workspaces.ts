import { Workspace } from '@/types/workspace';
import { api } from './api';

type TempTypeWorkspace = {
    id: number;
    userId: number;
    title: string;
    businessName: string;
    businessIndustry: string;
    contactEmail: string;
    contactPhone: string;
};

type UpdateWorkspace = {
    id: number;
    data: Workspace;
};

const workspaceSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getWorkspace: build.query<TempTypeWorkspace, any>({
            query: ({ id }) => `/workspaces/${id}`,
            providesTags: ['workspace'],
        }),
        getAllWorkspaces: build.query<TempTypeWorkspace[], any>({
            query: () => `/workspaces/all`,
            providesTags: ['workspace'],
        }),
        createWorkspace: build.mutation<any, Workspace>({
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

export const {
    useGetWorkspaceQuery,
    useLazyGetWorkspaceQuery,
    useGetAllWorkspacesQuery,
    useCreateWorkspaceMutation,
    useUpdateWorkspaceMutation,
    useDeleteWorkspaceMutation,
} = workspaceSlice;
