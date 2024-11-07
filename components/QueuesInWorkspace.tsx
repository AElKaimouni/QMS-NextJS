'use client';

import { useGetAllQueuesQuery } from '@/store/services/queue';
import { QueueCard } from './QueueCard';
import { FaPlus } from 'react-icons/fa';
import Loader from './loader';
import { getTranslation } from '@/i18n';
import Link from 'next/link';

const { t } = getTranslation();

interface QueuesInWorkspaceProps {
    wid: string;
}

export default function QueuesInWorkspace({ wid }: QueuesInWorkspaceProps) {
    const { data: queues = [], error, isLoading: isLoadingQueues, isFetching: isFetchingQueues } = useGetAllQueuesQuery({ wid });

    const errorQueue = error as { message: string };

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
            <div className="flex flex-col items-center justify-center p-5">
                <p className="text-center text-gray-500">{t('No queues found. Please create a new queue')}</p>
                <div className="mt-4 flex items-center justify-center">
                    <Link href={`/workspaces/${wid}/queues/new`} className="btn btn-primary">
                        <FaPlus className="mr-2 text-xl" />
                        {t('Create Queue')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:flex-row sm:flex-wrap">
            {queues
                .toSorted((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                .map((queue) => (
                    <QueueCard key={queue.id} queue={queue} />
                ))}
            <Link href={`/workspaces/${wid}/queues/new`} className="btn btn-primary">
                <FaPlus className="mr-2 text-xl" />
                {t('Create Queue')}
            </Link>
        </div>
    );
}
