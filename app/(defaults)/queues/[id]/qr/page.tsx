'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import { TbCopy } from 'react-icons/tb';
import { useGetQueueQuery } from '@/store/services/queue';
import Loader from '@/components/loader';
import { QueueStatus } from '@/types/queue';
import { getTranslation } from '@/i18n';
import { IoIosAlert } from 'react-icons/io';

interface QueueDetailsParams {
    params: {
        id: string;
    };
}

interface QueueError {
    status?: number;
    data?: {
        message?: string;
    };
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const { t, i18n } = getTranslation();
const qrCodeValue = 'http://www.admin-dashboard.com';

export default function QueueDetails({ params }: QueueDetailsParams) {
    const { id } = params;

    const { data: queue, error, isLoading } = useGetQueueQuery({ id });

    const queueError = error as QueueError;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    if (error || !queue) {
        return (
            <div>
                <p className="text-danger">{queueError?.data?.message}</p>
            </div>
        );
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(qrCodeValue);
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50">
            {queue?.status === QueueStatus.DELETED && (
                <div className="flex items-center rounded bg-danger-light p-3.5 text-danger dark:bg-danger-dark-light">
                    <IoIosAlert className="mr-8 size-6" />
                    <span className="ltr:pr-2 rtl:pl-2">
                        <strong className="ltr:mr-1 rtl:ml-1">{t('This queue has been deleted')}.</strong>
                    </span>
                </div>
            )}
            <div className="w-full max-w-md rounded-lg p-6">
                <div className="mb-4 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">{queue.title}</h2>
                </div>

                <div className="mb-4 flex items-center justify-center rounded-xl bg-gray-100 p-4">
                    <QRCode value={qrCodeValue} size={240} />
                </div>

                <div className="mb-4 flex items-center justify-center space-x-2">
                    <input type="text" value={qrCodeValue} readOnly className="form-input w-full rounded-lg border border-gray-300 p-2" />
                    <button onClick={handleCopyLink} className="flex items-center space-x-1 rounded-lg bg-blue-600 px-4 py-2 text-white">
                        <TbCopy className="size-4" />
                        <span>Copy</span>
                    </button>
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">Time & Date</h3>
                    <div className="mt-2 flex space-x-2">
                        <input type="text" value={queue.config?.time.startTime ?? ''} readOnly className="w-full rounded-lg border border-gray-300 p-2" />
                        <input type="text" value={queue.config?.time.endTime ?? ''} readOnly className="w-full rounded-lg border border-gray-300 p-2" />
                    </div>
                    <div className="mt-2 rounded-lg border border-gray-300 p-2">
                        <span>{queue.config?.time.days.map((index: number) => daysOfWeek[index]).join(' - ')}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">Description</h3>
                    <div className="mt-2 rounded-lg bg-gray-100 p-4">
                        <p className="text-sm text-gray-600">{queue.description}</p>
                    </div>
                </div>

                <div className="text-center">
                    <button className="font-semibold text-blue-600 underline" disabled={queue?.status === QueueStatus.DELETED}>
                        EDIT QUEUE
                    </button>
                </div>
            </div>
        </div>
    );
}
