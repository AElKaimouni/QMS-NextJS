'use client';

import { MdOutlineTimer } from 'react-icons/md';
import { Queue, QueueStatus } from '@/types/queue';
import { QueueCardDropdown } from './QueueCardDropdown';
import Link from 'next/link';
import { useDeleteQueueMutation } from '@/store/services/queue';
import { MouseEvent } from 'react';
import { QueryStatus } from '@reduxjs/toolkit/query';

interface QueueCardProps {
    queue: Queue;
}

const queueStatusClasses = {
    CREATED: 'bg-queueStatus-created',
    ACTIVE: 'bg-queueStatus-active',
    PAUSED: 'bg-queueStatus-paused',
    CLOSED: 'bg-queueStatus-closed',
    DELETED: 'bg-queueStatus-deleted',
};

export const QueueCard = ({ queue }: QueueCardProps) => {
    const [deleteQueue] = useDeleteQueueMutation();

    const handleDeleteQueue = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        deleteQueue({ id: queue.id })
            .unwrap()
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDropdownClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const href = queue.status === QueueStatus.DELETED ? `/queues/${queue.id}/qr` :  `/queues/${queue.id}`;

    return (
        <Link
            href={href}
            passHref
            className="relative w-full cursor-pointer rounded border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
        >
            <div className="relative z-10 px-6 py-7">
                <div className="flex justify-between">
                    <div className="mb-5 inline-block rounded-full bg-[#D7E8FF] p-2 text-[#2673DD]">
                        <MdOutlineTimer className="size-6" />
                    </div>
                    <p className="mt-2 text-lg font-bold">{queue.title}</p>
                    <div className="dropdown" onClick={handleDropdownClick}>
                        <QueueCardDropdown
                            dropdownOptions={[
                                {
                                    label: 'Edit',
                                    onClick: (e: MouseEvent) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        // router.push(`/queue/${queue.id}/edit`);
                                    },
                                },
                                {
                                    label: 'Delete',
                                    onClick: handleDeleteQueue,
                                },
                            ]}
                        />
                    </div>
                </div>
                <p className="font-extralight text-gray-400">{queue.description}</p>
                <div className="mt-5 flex items-center justify-between">
                    <h5 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">{queue.length}</h5>
                    <div className="flex items-center gap-2">
                        <span className={`badge ${queueStatusClasses[queue.status]}`}>{queue.status}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
