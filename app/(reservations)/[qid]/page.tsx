'use client';

import { useConsultQueueQuery } from '@/store/services/queue';
import { getTranslation } from '@/i18n';
import Loader from '@/components/loader';
import Link from 'next/link';
import NotFound from '@/app/not-found';
import { QueueStatus } from '@/types/queue';

type ReservationInfoProps = {
    params: { qid: string };
};

const { t } = getTranslation();

const calculateExpectedArrivalTime = (averageServeTime?: number, queueLength?: number, counter?: number) => {
    const now = new Date();
    const waitTimeInSeconds = (averageServeTime ?? 0) * ((queueLength ?? 0) - (counter ?? 0));
    return new Date(now.getTime() + waitTimeInSeconds * 1000);
};

const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="text-center">
        <div className="mb-1 text-gray-600">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
    </div>
);

export default function ReservationInfo({ params }: ReservationInfoProps) {
    const { qid } = params;

    const {
        data: queue,
        isError,
        isLoading,
    } = useConsultQueueQuery(
        { id: qid },
        {
            refetchOnReconnect: true,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
            pollingInterval: 10000,
        }
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    if (isError) {
        return <NotFound />;
    }

    const peopleAhead = (queue?.length ?? 0) - (queue?.counter ?? 0);
    const expectedArrival = calculateExpectedArrivalTime(queue?.averageServeTime, queue?.length, queue?.counter);

    return (
        <div className="min-h-[calc(100dvh-6rem)] p-4">
            <div className="mx-auto max-w-sm rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <h1 className="text-center text-4xl font-semibold">{queue?.title}</h1>
                </div>

                <div
                    className={`-mx-6 mb-6 px-6 py-2 text-center font-medium ${
                        queue?.status === QueueStatus.ACTIVE
                            ? 'bg-green-100 text-green-800'
                            : queue?.status === QueueStatus.PAUSED
                            ? 'bg-orange-100 text-orange-800'
                            : queue?.status === QueueStatus.CLOSED
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                    Queue status: {queue?.status}
                </div>

                <div className="mb-8 space-y-6">
                    <InfoItem label={t('Line number')} value={(queue?.counter ?? 0)} />
                    <InfoItem label={t('Number of users in line ahead of you')} value={peopleAhead} />
                    <InfoItem
                        label={t('Expected arrival time')}
                        value={expectedArrival.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    />
                    <InfoItem label={t('Your estimated wait time')} value={Math.round((queue?.averageServeTime ?? 0) / 60) + ' minutes'} />
                </div>

                <Link href={`/${qid}/reservations`}>
                    <button className="btn btn-primary w-full">{t('Go To Line')}</button>
                </Link>
            </div>
        </div>
    );
}
