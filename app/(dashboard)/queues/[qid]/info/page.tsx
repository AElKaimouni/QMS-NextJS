'use client';

import Loader from '@/components/loader';
import { getTranslation } from '@/i18n';
import { useGetQueueQuery } from '@/store/services/queue';
import { QueueStatus } from '@/types/queue';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoIosAlert } from 'react-icons/io';
import { TbCopy } from 'react-icons/tb';
import QRCode from 'react-qr-code';

interface QueueDetailsParams {
    params: {
        qid: string;
        wid: string;
    };
}

interface QueueError {
    status?: number;
    data?: {
        message?: string;
    };
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const { t } = getTranslation();

export default function QueueDetails({ params }: QueueDetailsParams) {
    const { qid } = params;
    const qrCodeValue = `${location.origin}/${qid}`;

    const { data: queue, error, isLoading } = useGetQueueQuery({ id: qid });

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
            <div className="flex items-center rounded bg-danger-light p-3.5 text-danger dark:bg-danger-dark-light">
                <IoIosAlert className="mr-8 size-6" />
                <span className="ltr:pr-2 rtl:pl-2">
                    <strong className="ltr:mr-1 rtl:ml-1">{queueError?.data?.message}.</strong>
                </span>
            </div>
        );
    }

    const handleCopyLink = async () => {
        try {
            // @ts-ignore
            const permissionStatus = await navigator.permissions.query({ name: 'clipboard-write' });

            if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
                // If permission is granted or needs prompting, try copying
                await navigator.clipboard.writeText(qrCodeValue);
                console.log('Text copied to clipboard!');
            } else {
                console.error('Clipboard permission denied');
            }
        } catch (err) {
            console.error('Failed to access clipboard:', err);
        }
    };

    const router = useRouter();
    const handleEdit = () => {
        router.push(`/queues/new?id=${qid}&edit=true`);
    };

    const handleManage = () => {
        router.push(`/queues/${qid}/manage`);
    };

    return (
        <div className="min-h-[calc(100dvh-6rem)] px-6">
            <ul className="flex space-x-2 sm:text-lg rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Queues</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{queue.title}</span>
                </li>
            </ul>
            <div className="mt-10 flex h-full w-full flex-col items-center justify-center bg-gray-50 sm:flex-row">
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
                        <h2 className="text-3xl font-semibold text-gray-800">{queue.title}</h2>
                    </div>

                    <div className="mb-4 flex items-center justify-center rounded-xl bg-gray-100 p-4">
                        <QRCode value={qrCodeValue} size={240} />
                    </div>

                    <div className="mb-4 flex items-center justify-center space-x-2">
                        <input type="text" value={qrCodeValue} readOnly className="form-input w-full rounded-lg border border-gray-300 p-2" />
                        <button onClick={handleCopyLink} className="flex items-center space-x-1 rounded-lg bg-blue-600 px-4 py-2 text-white">
                            <TbCopy className="size-4" />
                            <span>{t('Copy')}</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-800">{t('Time & Date')}</h3>
                        <div className="mt-2 flex space-x-2">
                            <input type="text" value={queue.config?.time.startTime ?? ''} readOnly className="w-full rounded-lg border border-gray-300 p-2" />
                            <input type="text" value={queue.config?.time.endTime ?? ''} readOnly className="w-full rounded-lg border border-gray-300 p-2" />
                        </div>
                        <div className="mt-2 rounded-lg border border-gray-300 p-2">
                            <span>{queue.config?.time.days.map((index: number) => daysOfWeek[index]).join(' - ')}</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-800">{t('Description')}</h3>
                        <div className="mt-2 rounded-lg bg-gray-100 p-4">
                            <p className="text-sm text-gray-600">{queue.description}</p>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-2">
                        <button className="btn btn-primary" onClick={handleManage} disabled={queue?.status === QueueStatus.DELETED}>
                            {t('Manage Queue')}
                        </button>
                        <button className="btn shadow-none" onClick={handleEdit} disabled={queue?.status === QueueStatus.DELETED}>
                            {t('Edit Queue')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
