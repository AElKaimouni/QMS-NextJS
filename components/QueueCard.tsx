'use client';

import { Queue } from '@/types/queue';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { CardDropdown } from './QueueCardDropdown';

import { usePathname, useRouter, useParams } from 'next/navigation';

interface QueueCardProps {
    queue: Queue;
    triggerDeleteConfimation: (id: string) => void;
}

const queueStatusClasses = {
    CREATED: 'bg-queueStatus-created',
    ACTIVE: 'bg-queueStatus-active',
    PAUSED: 'bg-queueStatus-paused',
    CLOSED: 'bg-queueStatus-closed',
    DELETED: 'bg-queueStatus-deleted',
};

export const QueueCard = ({ queue, triggerDeleteConfimation }: QueueCardProps) => {

    const router = useRouter();

    const handleDeleteQueue = (id: string) => {
        triggerDeleteConfimation(id);
    };

    const handleDropdownClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const href = `/queues/${queue.id}/info`;

    return (
        <Link
            href={href}
            passHref
            className="relative flex w-full cursor-pointer flex-col flex-wrap rounded-lg border-[#e0e6ed] bg-white p-1 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none sm:max-w-xs"
        >
            <div className="relative z-10 px-6 py-7">
                <div className="flex justify-between">
                    <div className="mb-5 inline-block rounded-full bg-[#D7E8FF] p-2 text-[#2673DD]">
                        <MdOutlineTimer className="size-6" />
                    </div>
                    <p className="mt-2 text-lg font-bold">{queue.title}</p>
                    <div className="dropdown" onClick={handleDropdownClick}>
                        <CardDropdown
                            dropdownOptions={[
                                {
                                    label: 'Edit',
                                    onClick: (e: MouseEvent) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        router.push(`/queue/${queue.id}/new`);
                                    },
                                },
                                {
                                    label: 'Delete',
                                    onClick: () => handleDeleteQueue(queue.id),
                                },
                            ]}
                        />
                    </div>
                </div>
                <p className="font-extralight text-gray-400">{queue.description}</p>
                <div className="mt-5 flex items-center justify-between">
                    <h5 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">{queue.length}</h5>
                    <div className="flex items-center gap-2">
                        <span className={`badge ${queueStatusClasses[queue.status] ?? 'bg-queueStatus-created'}`}>{queue.status ?? 'CREATED'}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
