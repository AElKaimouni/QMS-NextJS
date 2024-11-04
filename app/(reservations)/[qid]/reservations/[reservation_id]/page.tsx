'use client';

import { getTranslation } from '@/i18n';
import Loader from '@/components/loader';
import QRCode from 'react-qr-code';
import { useConsultReservationQuery } from '@/store/services/reservation';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

type ReservationInfoProps = {
    params: { queue_id: string; reservation_id: string };
};

const { t } = getTranslation();

export default function ReservationInfo({ params }: ReservationInfoProps) {
    const { reservation_id } = params;

    const sp = useSearchParams();

    const reservation_token = sp.get('token') ?? '';

    const {
        data: reservation,
        error: errorReservation,
        isLoading: loadingReservation,
    } = useConsultReservationQuery(
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

    if (loadingReservation) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    const handleDownloadPDF = () => {
        axios
            .get(`http://${location.host}/api/reservations/${reservation_id}/generate-pdf?token=${encodeURIComponent(reservation_token)}`, {
                responseType: 'blob',
                headers: {
                    Accept: 'application/pdf',
                }
            })
            .then((res) => {
                const blob = new Blob([res.data], { type: res.headers['content-type'] });

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'download.pdf';

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(link.href);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="min-h-[calc(100dvh-72px)] p-4">
            <div className="mx-auto max-w-sm rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-6 flex items-center justify-center gap-2 text-gray-600">
                    <QRCode value={location.href} size={128} />
                </div>

                {/* Line Information */}
                <div className="mb-8 space-y-6">
                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Line number')}:</div>
                        <div className="text-xl font-semibold">{reservation?.position}</div>
                    </div>

                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Number of users in line ahead of you')}:</div>
                        <div className="text-xl font-semibold">{(reservation?.counter ?? 0) - (reservation?.position ?? 0)}</div>
                    </div>

                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Expected arrival time')}:</div>
                        <div className="text-xl font-semibold">14:45</div>
                    </div>

                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Your estimated wait time')}:</div>
                        <div className="text-xl font-semibold">{reservation?.estimatedWaitTime}</div>
                    </div>
                </div>

                <button className="btn btn-primary w-full" onClick={handleDownloadPDF}>
                    Download
                </button>
            </div>
        </div>
    );
}
