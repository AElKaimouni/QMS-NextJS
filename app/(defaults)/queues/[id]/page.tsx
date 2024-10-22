'use client';

import Loader from '@/components/loader';
import { ButtonLoader } from '@/components/button-loader';
import { getTranslation } from '@/i18n';
import { useGetReservationsQuery } from '@/store/services/reservation';
import { getRelativeTimeString } from '@/utils/getRelativetimeString';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { FiHome } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useCallNextInQueueMutation } from '@/store/services/queue';

interface QueueDetailsParams {
    params: {
        id: string;
    };
}

const rtf = new Intl.RelativeTimeFormat('en', { style: 'short', numeric: 'auto' });

export default function QueueServing({ params }: QueueDetailsParams) {
    const { id } = params;
    const { t, i18n } = getTranslation();

    const [callNextInQueue, { isLoading: loadingCallNextInQueue, error: errorCallNextInQueue }] = useCallNextInQueueMutation();

    const { data: reservations, error: reservationError, isLoading: loadingReservations } = useGetReservationsQuery({ id, page: 1, size: 10, scope: 'all' });

    if (loadingReservations) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    if (reservationError || !reservations) {
        return (
            <div>
                <p className="text-danger">{reservationError?.message}</p>
            </div>
        );
    }

    if (reservations?.content.length === 0) {
        return (
            <div className="flex items-center justify-center p-5">
                <p>{t('No reservations found')}</p>
            </div>
        );
    }

    const { content: reservationsList } = reservations;

    const currentServing = reservationsList.find((reservation) => reservation.status === 'SERVING');
    const waitList = reservationsList.filter((reservation) => reservation.status === 'WAITING');
    const servedList = reservationsList.filter((reservation) => reservation.status === 'SERVED');

    const handleCallNext = () => {
        callNextInQueue({ id })
            .unwrap()
            .catch((error) => console.error(error));
    };

    return (
        <Tab.Group>
            <div className="sticky left-0 right-0 top-[72px] z-50 mt-6 bg-gray-50 px-6 dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                <Tab.List className="flex w-full flex-grow flex-wrap justify-center gap-1 bg-white shadow-sm dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${
                                    selected ? 'text-secondary !outline-none before:!w-full' : ''
                                } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                            >
                                <FiHome className="mr-2 size-5" />
                                {t('Check In')}
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${
                                    selected ? 'text-blue-500 !outline-none before:!w-full' : ''
                                } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-blue-500 before:transition-all before:duration-700 hover:text-blue-500 hover:before:w-full`}
                            >
                                <IoMdCheckmarkCircleOutline className="mr-2 size-5" />
                                {t('Completed')}
                            </button>
                        )}
                    </Tab>
                </Tab.List>
            </div>

            <Tab.Panels className="p-6 pt-0">
                <Tab.Panel>
                    <div className="flex h-full w-full flex-col justify-center gap-5 py-5 md:flex-row">
                        <div className="relative w-full max-w-sm rounded-xl border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="relative z-10 flex flex-col justify-center gap-3 px-6 py-7">
                                {/* <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">{t('Serving')} (1)</h2>
                                    <button className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-500 hover:bg-gray-200">Slide for Next Customer</button>
                                </div> */}
                                {currentServing ? (
                                    <div className="rounded-lg bg-gray-50 p-4 dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-lg font-medium">{currentServing?.email}</p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            {t('Serving from')}: {getRelativeTimeString(new Date(Date.parse(currentServing?.calledAt ?? '')), 'en')}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="rounded-lg bg-gray-50 p-4 dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-center font-medium">{t('No one is being served')}</p>
                                    </div>
                                )}
                                <button className="btn btn-primary max-w-md" onClick={handleCallNext}>
                                    {loadingCallNextInQueue ? <ButtonLoader /> : <FaPlus className="mr-3 size-4" />}
                                    {t('Call Next')}
                                </button>
                            </div>
                        </div>
                        <div className="relative w-full dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="relative z-10 py-7">
                                <h2 className="mb-4 text-xl font-semibold">
                                    {t('Waitlist')} ({waitList?.length})
                                </h2>
                                <div className="flex flex-col justify-center space-y-4">
                                    {waitList.map((waiting) => (
                                        <div key={waiting.id} className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                            <p className="text-lg font-medium">{`${waiting.position}: ${waiting.email}`}</p>
                                            <p className="mt-2 text-sm text-gray-600">
                                                {t('Joined')} {getRelativeTimeString(new Date(Date.parse(waiting.joinAt)), i18n.language)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab.Panel>

                {/* Completed Tab */}
                <Tab.Panel>
                    <div className="flex h-full w-full flex-col justify-center gap-5 py-5 md:flex-row">
                        <div className="relative w-full dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="relative z-10 py-7">
                                <h2 className="mb-4 text-xl font-semibold">
                                    {t('Served')} ({servedList.length ?? '0'})
                                </h2>
                                <div className="flex flex-col justify-center space-y-4">
                                    {servedList.length > 0 ? (
                                        <>
                                            {servedList.map((served) => (
                                                <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                                    <p className="text-lg font-medium">
                                                        {served.position}: {served.email}
                                                    </p>
                                                    <p className="mt-2 text-xs text-gray-600 text-right">
                                                        {t('Time')}:{' '}
                                                        {new Date(Date.parse(served?.servedAt ?? '')).toLocaleString(navigator.language, {
                                                            dateStyle: 'short',
                                                            timeStyle: 'short',
                                                        })}
                                                    </p>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                            <p className="text-lg font-medium">{t('No one has been served yet')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}
