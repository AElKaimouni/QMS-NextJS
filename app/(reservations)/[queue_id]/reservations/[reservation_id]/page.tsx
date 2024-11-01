'use client';

import { getTranslation } from '@/i18n';
import Loader from '@/components/loader';
import QRCode from 'react-qr-code';
import { useConsultReservationQuery, useLazyDownloadPDFReservationQuery } from '@/store/services/reservation';

type ReservationInfoProps = {
    params: { queue_id: string; reservation_id: string };
};

const { t } = getTranslation();

export default function ReservationInfo({ params }: ReservationInfoProps) {
    const { queue_id, reservation_id } = params;

    const reservation_token = localStorage.getItem('reservation_token') ?? '';

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

    const [downloadPDF, { data: pdfData, isLoading: loadingPDF }] = useLazyDownloadPDFReservationQuery();

    if (loadingReservation) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    const handleDownloadPDF = () => {
        downloadPDF({ id: reservation_id, reservation_token })
            .unwrap()
            .then((res) => {
                // Create a download link and trigger download
                const url = window.URL.createObjectURL(res);
                const link = document.createElement('a');
                link.href = url;

                // Try to get filename from response headers if possible
                const filename = 'document.pdf';
                link.setAttribute('download', filename);

                // Append to body, click, and remove
                document.body.appendChild(link);
                link.click();
                link.remove();

                // Clean up the created URL
                window.URL.revokeObjectURL(url);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="min-h-[calc(100dvh-72px)] p-4">
            <div className="mx-auto max-w-sm rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-6 flex items-center justify-center gap-2 text-gray-600">
                    <QRCode value={'http://www.google.com'} size={128} />
                </div>

                {/* Line Information */}
                <div className="mb-8 space-y-6">
                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Line number')}:</div>
                        <div className="text-xl font-semibold">{reservation?.position}</div>
                    </div>

                    <div className="text-center">
                        <div className="mb-1 text-gray-600">{t('Number of users in line ahead of you')}:</div>
                        <div className="text-xl font-semibold">{reservation?.counter}</div>
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
