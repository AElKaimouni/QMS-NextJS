'use client';

import { getTranslation } from '@/i18n';
import Loader from '@/components/loader';
import QRCode from 'react-qr-code';
import { useConsultReservationQuery } from '@/store/services/reservation';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

type ReservationInfoProps = {
    params: {
        queue_id: string;
        reservation_id: string;
    };
};

interface InfoItemProps {
    label: string;
    value: React.ReactNode;
}

const { t } = getTranslation();

const calculateExpectedArrivalTime = (averageServeTime?: number, queueLength?: number, counter?: number) => {
    const now = new Date();
    const waitTimeInSeconds = (averageServeTime ?? 0) * ((queueLength ?? 0) - (counter ?? 0));
    return new Date(now.getTime() + waitTimeInSeconds * 1000);
};

const InfoItem = ({ label, value }: InfoItemProps) => (
    <div className="text-center">
        <div className="mb-1 text-gray-600">{label}:</div>
        <div className="text-xl font-semibold">{value}</div>
    </div>
);

const downloadPDF = async (reservationId: string, token: string) => {
    try {
        const response = await axios.get(`https://${location.host}/api/reservations/${reservationId}/generate-pdf?token=${encodeURIComponent(token)}`, {
            responseType: 'blob',
            headers: { Accept: 'application/pdf' },
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'reservation.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading PDF:', error);
    }
};

const calculatePeopleAhead = (position?: number, counter?: number) => (position ?? 0) - (counter ?? 0);

export default function ReservationInfo({ params }: ReservationInfoProps) {
    const { reservation_id } = params;
    const searchParams = useSearchParams();
    const reservation_token = searchParams.get('token') ?? '';

    const { data: reservation, isLoading } = useConsultReservationQuery(
        {
            id: reservation_id,
            reservation_token: reservation_token,
        },
        {
            skip: !reservation_token,
            refetchOnFocus: true,
            refetchOnReconnect: true,
        }
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    const peopleAhead = calculatePeopleAhead(reservation?.position, reservation?.counter);

    return (
        <div className="min-h-[calc(100dvh-6rem)] p-4">
            <div className="mx-auto max-w-sm rounded-lg border border-gray-200 bg-white p-6">
                <h1 className="mb-5 text-center text-4xl">{reservation?.queueTitle}</h1>

                <div className="mb-6 flex items-center justify-center gap-2 text-gray-600">
                    <QRCode value={location.href} size={128} />
                </div>

                <div className="mb-8 space-y-6">
                    <InfoItem label={t('Line number')} value={reservation?.position} />
                    <InfoItem label={t('Number of users in line ahead of you')} value={peopleAhead} />
                    <InfoItem
                        label={t('Expected arrival time')}
                        value={calculateExpectedArrivalTime(reservation?.estimatedWaitTime, peopleAhead, reservation?.position).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    />
                    <InfoItem label={t('Your estimated wait time')} value={Math.round((reservation?.estimatedWaitTime ?? 0) / 60) + ' minutes'} />
                </div>

                <button className="btn btn-primary w-full" onClick={() => downloadPDF(reservation_id, reservation_token)}>
                    {t('Download')}
                </button>
            </div>
        </div>
    );
}
