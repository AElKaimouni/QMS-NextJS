'use client';

import IconPlus from '@/components/icon/icon-plus';
import { coloredToast } from '@/components/Toast';
import { getTranslation } from '@/i18n';
import { useDeleteQueueMutation, useLazyGetAllQueuesQuery } from '@/store/services/queue';
import { useGetAllWorkspacesQuery } from '@/store/services/workspaces';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import Loader from '@/components/loader';
import { QueueCard } from '@/components/QueueCard';
import { CreateWorkspaceModal } from '@/components/QueuesInWorkspace/CreateWorkspaceModal';
import { DeleteComfirmationModal } from '@/components/QueuesInWorkspace/DeleteConfirmationModal';

const { t } = getTranslation();

export default function QueuesInWorkspace() {
    const { data: workspaces, isLoading: loadingWorkspaces, error: errorWorkspaces } = useGetAllWorkspacesQuery(undefined);

    const [wid, setWid] = useState('1');

    // const { data: queues = [], error, isLoading: isLoadingQueues, isFetching: isFetchingQueues } = useGetAllQueuesQuery({ wid });
    const [getQueuesOfWorkspace, { data: queues = [], error, isLoading: isLoadingQueues, isFetching: isFetchingQueues }] = useLazyGetAllQueuesQuery();
    const [deleteQueue] = useDeleteQueueMutation();

    const errorQueue = error as { message: string };

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
    const [noCancelCreateWorkspace, setNoCancelCreateWorkspace] = useState(false);
    const [queueIdToDelete, setQueueIdToDelete] = useState('');

    useEffect(() => {
        if (workspaces && workspaces.length === 0) {
            setShowCreateWorkspaceModal(true);
            setNoCancelCreateWorkspace(true);
        }
    }, [workspaces]);

    useEffect(() => {
        getQueuesOfWorkspace({ wid });
    }, [wid]);

    const triggerDeleteConfimation = (queueId: string) => {
        setQueueIdToDelete(queueId);
        setDeleteConfirmation(true);
    };

    const handleDeleteQueue = () => {
        deleteQueue({ id: queueIdToDelete })
            .unwrap()
            .then(() => setDeleteConfirmation(false));
        setQueueIdToDelete('');
    };

    const handleCancelDelete = () => {
        setQueueIdToDelete('');
        setDeleteConfirmation(false);
    };

    const handleCancelCreateWorkspace = () => {
        setShowCreateWorkspaceModal(false);
    };

    const handleDismissCreateWorkspace = () => {
        if (noCancelCreateWorkspace) {
            coloredToast('info', t('You must create at least one workspace'));
            return;
        }
        setShowCreateWorkspaceModal(false);
    };

    const handleCreateWorkspace = () => {
        setShowCreateWorkspaceModal(true);
    };

    const selectOptionsWorkspaces = useMemo(() => {
        return workspaces?.map((w) => ({
            label: w.title,
            value: w.id,
        }));
    }, [workspaces]);

    if (isLoadingQueues || isFetchingQueues) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    if (errorQueue) {
        return (
            <div>
                <p className="text-danger">{errorQueue.message}</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
                <Select
                    className="w-full max-w-xl"
                    // @ts-ignore
                    options={selectOptionsWorkspaces}
                    placeholder={t('Select a Workspace')}
                    value={workspaces?.find((w) => w.id === wid)?.title}
                    // @ts-ignore
                    onChange={(newValue) => setWid(newValue?.value ?? '1')}
                    isSearchable={false}
                    isLoading={loadingWorkspaces}
                />
                <button onClick={handleCreateWorkspace} className="btn btn-secondary w-full sm:max-w-56">
                    <IconPlus className="mr-2 text-xl" />
                    {t('Create Workspace')}
                </button>
                <Link href={`/queues/new`} className="btn btn-primary w-full sm:max-w-56">
                    <IconPlus className="mr-2 text-xl" />
                    {t('Create Queue')}
                </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
                {queues
                    .toSorted((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                    .map((queue) => (
                        <QueueCard key={queue.id} queue={queue} triggerDeleteConfimation={triggerDeleteConfimation} />
                    ))}
                <DeleteComfirmationModal isOpen={deleteConfirmation} onClose={handleCancelDelete} onConfirm={handleDeleteQueue} />
                <CreateWorkspaceModal isOpen={showCreateWorkspaceModal} onClose={handleCancelCreateWorkspace} onDismiss={handleDismissCreateWorkspace} />
            </div>
        </>
    );
}

