'use client';

import { useConsultQueueQuery } from '@/store/services/queue';
import { getTranslation } from '@/i18n';
import Loader from '@/components/loader';
import Link from 'next/link';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import NotFound from '@/app/not-found';

type ReservationInfoProps = {
    params: { qid: string };
};

const { t } = getTranslation();

export default function ReservationInfo({ params }: ReservationInfoProps) {
    const { qid } = params;

    const router = useRouter();

    const {
        data: queue,
        error: errorQueue,
        isError: isErrorQueue,
        isLoading: loadingQueue,
        isFetching: fetchingQueue,
    } = useConsultQueueQuery(
        { id: qid },
        {
            refetchOnReconnect: true,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
            pollingInterval: 10000,
        }
    );

    if (loadingQueue) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    if (isErrorQueue) {
        return <NotFound />
    }

    return (
        <div className="min-h-[calc(100dvh-72px)] p-4">
            <div className="mx-auto max-w-sm rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-6 flex items-center justify-center gap-2 text-gray-600">
                    <HiOutlineInformationCircle size={24} />
                    <span>Info</span>
                    {fetchingQueue && <Loader size="small" />}
                </div>

                {/* Line Information */}
                <div className="mb-8 space-y-6">
                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Line number')}:</div>
                        <div className="text-xl font-semibold">{queue?.counter}</div>
                    </div>

                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Number of users in line ahead of you')}:</div>
                        <div className="text-xl font-semibold">{(queue?.length ?? 0) - (queue?.counter ?? 0)}</div>
                    </div>

                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Expected arrival time')}:</div>
                        <div className="text-xl font-semibold">14:45</div>
                    </div>

                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Your estimated wait time')}:</div>
                        <div className="text-xl font-semibold">{queue?.averageServeTime}</div>
                    </div>
                </div>

                <Link href={`/${qid}/reservations`}>
                    <button className="btn btn-primary w-full">{t('Go To Line')}</button>
                </Link>
            </div>
        </div>
    );
}
