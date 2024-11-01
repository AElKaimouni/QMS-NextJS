'use client';

import { useGetAllQueuesQuery } from '@/store/services/queue';
import { QueueCard } from './QueueCard';
import { FaPlus } from 'react-icons/fa';
import Loader from './loader';
import { getTranslation } from '@/i18n';

const { t } = getTranslation();

export default function HomePanel() {
    const { data: queues = [], error, isLoading: isLoadingQueues, isFetching: isFetchingQueues } = useGetAllQueuesQuery();

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
            <div className="flex items-center justify-center p-5">
                <p className="text-center text-gray-500">
                    {t('No queues found. Please create a new queue by clicking the ')} <FaPlus size={18} className="mx-2 inline" /> {t(' button below')}.
                </p>
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
        </div>
    );
}
