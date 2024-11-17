'use client';

import { useDeleteQueueMutation, useGetAllQueuesQuery } from '@/store/services/queue';
import { QueueCard } from './QueueCard';
import { FaPlus } from 'react-icons/fa';
import IconPlus from "@/components/icon/icon-plus"
import Loader from './loader';
import { getTranslation } from '@/i18n';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const { t } = getTranslation();

interface QueuesInWorkspaceProps {
    wid: string;
}

export default function QueuesInWorkspace({ wid }: QueuesInWorkspaceProps) {
    const { data: queues = [], error, isLoading: isLoadingQueues, isFetching: isFetchingQueues } = useGetAllQueuesQuery({ wid });
    const [deleteQueue] = useDeleteQueueMutation();

    const errorQueue = error as { message: string };

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [queueIdToDelete, setQueueIdToDelete] = useState('');

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

    if (queues.length === 0) {
        return (
            <>
                <Link href={`/queues/new`} className="btn btn-primary ml-auto">
                    <IconPlus className="mr-2 text-xl" />
                    {t('Create Queue')}
                </Link>
                {/* <p className="text-center text-gray-500">{t('No queues found. Please create a new queue')}</p> */}
            </>
        );
    }

    return (
        <>
            {queues
                .toSorted((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                .map((queue) => (
                    <QueueCard key={queue.id} queue={queue} triggerDeleteConfimation={triggerDeleteConfimation} />
                ))}
            <DeleteComfirmationModal isOpen={deleteConfirmation} onClose={handleCancelDelete} onConfirm={handleDeleteQueue} />
        </>
    );
}

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteComfirmationModal = ({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h5 className="text-lg font-bold">{t('Delete Queue')}</h5>
                                </div>
                                <div className="p-5">
                                    <p> {t('Are you sure you want to proceed? This action cannot be undone')}.</p>
                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                            {t('Cancel')}
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={onConfirm}>
                                            {t('Confirm')}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
