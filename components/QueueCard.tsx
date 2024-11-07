'use client';

import { useDeleteQueueMutation } from '@/store/services/queue';
import { Queue } from '@/types/queue';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { CardDropdown } from './QueueCardDropdown';
import { usePathname, useRouter, useParams } from 'next/navigation';

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

    const { wid } = useParams();

    const router = useRouter();

    const handleDeleteQueue = () => {
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

    const pathname = usePathname();
    const href = pathname + `/queues/${queue.id}/info`;

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
                        <CardDropdown
                            dropdownOptions={[
                                {
                                    label: 'Edit',
                                    onClick: (e: MouseEvent) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        router.push(`/workspaces/${wid}/queue/${queue.id}/new`);
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
                        <span className={`badge ${queueStatusClasses[queue.status] ?? 'bg-queueStatus-created'}`}>{queue.status ?? 'CREATED'}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
