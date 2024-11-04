'use client';

import { useGetAllWorkspacesQuery, useDeleteWorkspaceMutation } from '@/store/services/workspaces';
import { CardDropdown } from '@/components/QueueCardDropdown';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader';
import { getTranslation } from '@/i18n';

const { t } = getTranslation();

const Workspaces = () => {
    const { data: workspaces = [], isLoading: loadingWorkspaces, error: errorWorkspaces } = useGetAllWorkspacesQuery(undefined);

    if (loadingWorkspaces)
        return (
            <div className="flex items-center justify-center p-4">
                <Loader />
            </div>
        );

    return (
        <div className="min-h-[calc(100dvh - 72px)] flex flex-col items-center justify-center gap-4 p-4 sm:flex-row sm:flex-wrap">
            {workspaces.map((workspace) => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
        </div>
    );
};

export default Workspaces;

type Workspace = {
    id: number;
    userId: number;
    title: string;
    businessName: string;
    businessIndustry: string;
    contactEmail: string;
    contactPhone: string;
};

interface WorkspaceCardProps {
    workspace: Workspace;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
    const [deleteWorkspace] = useDeleteWorkspaceMutation();

    const handleDropdownClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const router = useRouter();

    const handleEditWorkspace = () => {
        router.push(`/workspaces/${workspace.id}/edit`);
    };

    const handleDeleteWorkspace = () => {
        deleteWorkspace({ id: workspace.id })
            .unwrap()
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCardClick = () => {
        localStorage.setItem('last_workspace', JSON.stringify(workspace.id));
        router.push(`/workspaces/${workspace.id}`);
    }

    return (
        <div className="flex w-full flex-col flex-wrap rounded-lg border bg-white p-4 shadow-md sm:max-w-xs">
            <div className="flex items-center justify-between">
                <div className="rounded-full bg-blue-500 p-2">
                    <span role="img" aria-label="icon" className="text-white">
                        🏢
                    </span>
                </div>

                <div className="dropdown" onClick={handleDropdownClick}>
                    <CardDropdown
                        dropdownOptions={[
                            {
                                label: 'Edit',
                                onClick: handleEditWorkspace,
                            },
                            {
                                label: 'Delete',
                                onClick: handleDeleteWorkspace,
                            },
                        ]}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold">{workspace.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{workspace.businessName}</p>
                <p className="text-sm text-gray-500">{workspace.businessIndustry}</p>
            </div>

            {/* Contact Section */}
            <div className="mt-4 text-sm">
                <p className="text-gray-600">
                    <strong>Email:</strong> {workspace.contactEmail}
                </p>
                <p className="text-gray-600">
                    <strong>Phone:</strong> {workspace.contactPhone}
                </p>
            </div>

            {/* Footer with Button */}
            <button className="mt-4 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-500" onClick={handleCardClick}>{t('See More')}</button>
        </div>
    );
};
