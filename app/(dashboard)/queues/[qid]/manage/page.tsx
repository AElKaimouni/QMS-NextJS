'use client';

import Loader from '@/components/loader';
import { ButtonLoader } from '@/components/button-loader';
import { getTranslation } from '@/i18n';
import { useGetReservationsQuery } from '@/store/services/reservation';
import { getRelativeTimeString } from '@/utils/getRelativetimeString';
import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiHome } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useCallNextInQueueMutation, useStartQueueMutation, useCloseQueueMutation, useDeleteQueueMutation, usePauseQueueMutation, useGetQueueQuery } from '@/store/services/queue';
import { FaPlus, FaPlay, FaPause, FaTrash } from 'react-icons/fa6';
import { QueueStatus } from '@/types/queue';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { BiInfoCircle } from 'react-icons/bi';
import { Reservation, ReservationStatus } from '@/types/reservation';

interface QueueDetailsParams {
    params: {
        qid: string;
        wid: string;
    };
}

interface ReservationError {
    status?: number;
    data?: {
        message?: string;
    };
}

const queueStatusClasses = {
    CREATED: 'bg-queueStatus-created',
    ACTIVE: 'bg-queueStatus-active',
    PAUSED: 'bg-warning',
    CLOSED: 'bg-queueStatus-closed',
    DELETED: 'bg-queueStatus-deleted',
};

// const rtf = new Intl.RelativeTimeFormat('en', { style: 'short', numeric: 'auto' });
const { t, i18n } = getTranslation();

export default function QueueServing({ params }: QueueDetailsParams) {
    const { qid } = params;

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [openQueueMemberInfoModal, setOpenQueueMemberInfoModal] = useState(false);
    const [queueMemberInfo, setQueueMemberInfo] = useState<Reservation | null>();

    const { data: queue, isLoading: loadingQueue, error: errorQueue } = useGetQueueQuery({ id: qid });

    const [startQueue, { isLoading: loadingStartQueue, error: errorStartQueue }] = useStartQueueMutation();
    const [closeQueue, { isLoading: loadingCloseQueue, error: errorCloseQueue }] = useCloseQueueMutation();
    const [deleteQueue, { isLoading: loadingDeleteQueue, error: errorDeleteQueue }] = useDeleteQueueMutation();
    const [pauseQueue, { isLoading: loadingPauseQueue, error: errorPauseQueue }] = usePauseQueueMutation();

    const [callNextInQueue, { isLoading: loadingCallNextInQueue, error: errorCallNextInQueue }] = useCallNextInQueueMutation();

    const {
        data: reservations,
        error,
        isLoading: loadingReservations,
        isFetching: fetchingReservations,
    } = useGetReservationsQuery(
        { id: qid, page: 0, size: 10, scope: 'all' },
        {
            refetchOnMountOrArgChange: true,
            pollingInterval: 10000,
            refetchOnReconnect: true,
        }
    );

    const reservationError = error as ReservationError;

    const [queueStatus, setQueueStatus] = useState<QueueStatus>(queue?.status ?? QueueStatus.CREATED);

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
                <p className="text-danger">{reservationError?.data?.message}</p>
            </div>
        );
    }

    if (queue?.status === QueueStatus.DELETED) {
        return (
            <div className="flex items-center rounded bg-danger-light p-3.5 text-danger dark:bg-danger-dark-light">
                <span className="ltr:pr-2 rtl:pl-2">
                    <strong className="ltr:mr-1 rtl:ml-1">{t('Error!')}</strong>
                    {t('This queue has been deleted')}.
                </span>
            </div>
        );
    }

    const { content: reservationsList } = reservations;

    const currentServingList = reservationsList.filter((reservation) => reservation.status === 'SERVING');
    const waitList = reservationsList.filter((reservation) => reservation.status === 'WAITING');
    const servedList = reservationsList.filter((reservation) => reservation.status === 'SERVED');

    const handleCallNext = () => {
        if (queue?.status !== QueueStatus.ACTIVE) {
            return;
        }
        callNextInQueue({ id: qid })
            .unwrap()
            .catch((error) => console.error(error));
    };

    // Queue management functions
    const handleStartQueue = () => {
        startQueue({ id: qid })
            .unwrap()
            .then(() => {
                setQueueStatus(QueueStatus.ACTIVE);
            })
            .catch((error) => console.error(error));
    };

    // Loading for every queue management function
    const loadingQueueManagement = loadingStartQueue || loadingPauseQueue || loadingCloseQueue || loadingDeleteQueue;

    const handlePauseQueue = () => {
        pauseQueue({ id: qid })
            .unwrap()
            .then(() => {
                setQueueStatus(QueueStatus.PAUSED);
            })
            .catch((error) => console.error(error));
    };

    const handleCloseQueue = () => {
        closeQueue({ id: qid })
            .unwrap()
            .then(() => {
                setQueueStatus(QueueStatus.CLOSED);
            })
            .catch((error) => console.error(error));
    };

    const handleDeleteQueue = () => {
        deleteQueue({ id: qid })
            .unwrap()
            .then(() => {
                setQueueStatus(QueueStatus.DELETED);
            })
            .catch((error) => console.error(error));
    };

    const handleShowQueueMemberInfo = (qmi: Reservation) => {
        setQueueMemberInfo(qmi);
        setOpenQueueMemberInfoModal(true);
    };

    return (
        <div className="md:px-6">
            <ul className="mb-4 ml-5 flex space-x-2 md:text-lg rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link href="/queues" className="text-primary hover:underline">
                        Queues
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{queue?.title}</span>
                </li>
            </ul>
            <Tab.Group>
                <div className="sticky left-0 right-0 top-[72px] z-50 mt-6 bg-gray-50 px-6 dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none md:hidden">
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

                <div className="flex w-full justify-center">
                    <div className={`mx-6 flex max-w-sm items-center justify-center rounded ${queueStatusClasses[queue?.status ?? QueueStatus.CREATED]} p-3.5 dark:bg-primary-dark-light`}>
                        <span className="ltr:pl-2 rtl:pr-2">{t('Queue status: ')}</span>
                        <strong className="ltr:ml-1 rtl:mr-1">{queue?.status}</strong>
                    </div>
                </div>
                <div className="my-6 grid grid-cols-2 justify-center gap-4 px-6 md:grid-cols-4">
                    <button
                        className="btn btn-success transform text-sm transition duration-300 hover:scale-105 md:text-base"
                        onClick={handleStartQueue}
                        disabled={queueStatus === QueueStatus.ACTIVE || loadingQueueManagement}
                    >
                        <FaPlay className="mr-1 md:mr-2" /> {t('Start Queue')}
                    </button>
                    <button
                        className="btn btn-warning transform text-sm transition duration-300 hover:scale-105 md:text-base"
                        onClick={handlePauseQueue}
                        disabled={queueStatus !== QueueStatus.ACTIVE || loadingQueueManagement}
                    >
                        <FaPause className="mr-1 md:mr-2" /> {t('Pause Queue')}
                    </button>
                    <button
                        className="btn btn-danger transform text-sm transition duration-300 hover:scale-105 md:text-base"
                        onClick={handleCloseQueue}
                        disabled={queueStatus === QueueStatus.CLOSED || loadingQueueManagement}
                    >
                        {t('Close Queue')}
                    </button>
                    <button
                        className="btn btn-danger transform text-sm transition duration-300 hover:scale-105 md:text-base"
                        onClick={() => setOpenConfirmationModal(true)}
                        disabled={loadingQueueManagement}
                    >
                        <FaTrash className="mr-1 md:mr-2" /> {t('Delete Queue')}
                    </button>
                </div>

                <ComfirmationModal isOpen={openConfirmationModal} onClose={() => setOpenConfirmationModal(false)} onConfirm={handleDeleteQueue} />
                {queueMemberInfo && <QueueMemberDetailsModal isOpen={openQueueMemberInfoModal} onClose={() => setOpenQueueMemberInfoModal(false)} reservation={queueMemberInfo} />}

                <Tab.Panels className="p-6 pt-0">
                    <Tab.Panel>
                        <div className="flex h-full w-full flex-col justify-center gap-5 py-5 md:flex-row">
                            <div className="relative w-full dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                <div className="relative z-10 py-7">
                                    <h2 className="mb-4 text-xl font-semibold">
                                        {t('Waitlist')} ({waitList?.length})
                                    </h2>
                                    <div className="flex flex-col justify-center space-y-4">
                                        {waitList.map((waiting) => (
                                            <div key={waiting.id} className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                                <div className="flex w-full items-center justify-between">
                                                    <p className="text-lg font-medium">{`${waiting.position}: ${waiting.email}`}</p>
                                                    <button onClick={() => handleShowQueueMemberInfo(waiting)}>
                                                        <BiInfoCircle className="h-6 w-6 text-gray-600" />
                                                    </button>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    {t('Joined')} {getRelativeTimeString(new Date(Date.parse(waiting.joinAt)), i18n.language)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="relative w-full max-w-sm rounded-xl border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                <div className="relative z-10 flex flex-col justify-center gap-3 px-6 py-7">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h2 className="text-xl font-semibold">
                                            {t('Serving')} ({currentServingList?.length})
                                        </h2>
                                        {/* {fetchingReservations && (
                                            <div className="flex items-center justify-center p-2">
                                                <Loader size="small" />
                                            </div>
                                        )} */}
                                    </div>
                                    {currentServingList.length > 0 ? (
                                        <>
                                            {currentServingList.map((currentServing) => (
                                                <div className="rounded-lg bg-gray-50 p-4 dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1 space-y-3">
                                                            {Object.entries(currentServing?.info || {}).map(([key, value]) => {
                                                                const formattedKey = key.replaceAll('_', ' ');
                                                                return (
                                                                    <div key={key} className="flex flex-col">
                                                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{formattedKey}</span>
                                                                        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{value as string}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                        <button onClick={() => handleShowQueueMemberInfo(currentServing)}>
                                                            <BiInfoCircle className="h-6 w-6 text-gray-600" />
                                                        </button>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        {t('Serving from')}: {getRelativeTimeString(new Date(Date.parse(currentServing?.calledAt ?? '')), i18n.language)}
                                                    </p>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="rounded-lg bg-gray-50 p-4 dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                            <p className="text-center font-medium">{t('No one is being served')}</p>
                                        </div>
                                    )}
                                    <button className="btn btn-primary max-w-md" onClick={handleCallNext} disabled={queue?.status !== QueueStatus.ACTIVE}>
                                        {loadingCallNextInQueue ? <ButtonLoader /> : <FaPlus className="mr-3 size-4" />}
                                        {t('Call Next')}
                                    </button>
                                </div>
                            </div>

                            <div className="relative hidden w-full dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none md:inline">
                                <div className="relative z-10 py-7">
                                    <h2 className="mb-4 text-xl font-semibold">
                                        {t('Served')} ({servedList.length ?? '0'})
                                    </h2>
                                    <div className="flex flex-col justify-center space-y-4">
                                        {servedList.length > 0 ? (
                                            <>
                                                {servedList.map((served) => (
                                                    <div key={served.id} className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                                        <div className="flex w-full items-center justify-between">
                                                            <p className="text-lg font-medium">
                                                                {served.position}: {served.email}
                                                            </p>
                                                            <button onClick={() => handleShowQueueMemberInfo(served)}>
                                                                <BiInfoCircle className="h-6 w-6 text-gray-600" />
                                                            </button>
                                                        </div>
                                                        <p className="mt-2 text-right text-xs text-gray-600">
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

                    {/* Completed Tab */}
                    <Tab.Panel className="md:hidden">
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
                                                    <div key={served.id} className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                                        <div className="flex w-full items-center justify-between">
                                                            <p className="text-lg font-medium">
                                                                {served.position}: {served.email}
                                                            </p>
                                                            <button onClick={() => handleShowQueueMemberInfo(served)}>
                                                                <BiInfoCircle className="h-6 w-6 text-gray-600" />
                                                            </button>
                                                        </div>
                                                        <p className="mt-2 text-right text-xs text-gray-600">
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
        </div>
    );
}

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ComfirmationModal = ({ isOpen, onClose, onConfirm }: ConfirmationModalProps) => {
    const { t } = getTranslation();
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h5 className="text-lg font-bold">{t('Delete Queue ?')}</h5>
                                </div>
                                <div className="p-5">
                                    <p> {t('Are you sure you want to proceed? This action cannot be undone')}.</p>
                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                            {t('Cancel')}
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={onConfirm}>
                                            {t('Confirm')}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

const QueueMemberDetailsModal = ({ isOpen, onClose, reservation }: { isOpen: boolean; onClose: () => void; reservation: Reservation }) => {
    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'WAITING':
                return { label: 'Waiting', colorClass: 'text-yellow-500' };
            case 'SERVING':
                return { label: 'Being Served', colorClass: 'text-blue-500' };
            case 'CANCELED':
                return { label: 'Canceled', colorClass: 'text-red-500' };
            case 'SERVED':
                return { label: 'Served', colorClass: 'text-green-500' };
            case 'EXPIRED':
                return { label: 'Expired', colorClass: 'text-gray-500' };
            default:
                return { label: 'Unknown', colorClass: 'text-gray-500' };
        }
    };

    const statusInfo = getStatusInfo(reservation.status);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <Dialog.Title className="text-lg font-bold">Queue Member Details</Dialog.Title>
                                </div>

                                <div className="p-5">
                                    <div className="space-y-4">
                                        {/* Reservation ID */}
                                        <div className="flex items-start">
                                            <span className="w-32 flex-shrink-0 font-semibold text-gray-700 dark:text-gray-300">Reservation ID:</span>
                                            <p className="flex-1 text-lg text-gray-900 dark:text-gray-100">{reservation.id}</p>
                                        </div>

                                        {/* Position */}
                                        <div className="flex items-start">
                                            <span className="w-32 flex-shrink-0 font-semibold text-gray-700 dark:text-gray-300">Position:</span>
                                            <p className="flex-1 text-lg text-gray-900 dark:text-gray-100">{reservation.position}</p>
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-start">
                                            <span className="w-32 flex-shrink-0 font-semibold text-gray-700 dark:text-gray-300">Status:</span>
                                            <p className={`flex-1 text-lg ${statusInfo.colorClass}`}>{statusInfo.label}</p>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start">
                                            <span className="w-32 flex-shrink-0 font-semibold text-gray-700 dark:text-gray-300">Email:</span>
                                            <p className="flex-1 text-lg text-gray-900 dark:text-gray-100">{reservation.email}</p>
                                        </div>

                                        {/* Join Time */}
                                        <div className="flex items-start">
                                            <span className="w-32 flex-shrink-0 font-semibold text-gray-700 dark:text-gray-300">Joined at:</span>
                                            <p className="flex-1 text-lg text-gray-900 dark:text-gray-100">{new Date(reservation.joinAt).toLocaleString()}</p>
                                        </div>

                                        {/* Called Time */}
                                        {reservation.calledAt && (
                                            <div className="flex items-start">
                                                <span className="w-32 flex-shrink-0 font-semibold text-gray-700 dark:text-gray-300">Called at:</span>
                                                <p className="flex-1 text-lg text-gray-900 dark:text-gray-100">{new Date(reservation.calledAt).toLocaleString()}</p>
                                            </div>
                                        )}

                                        {/* Served Time */}
                                        {reservation.servedAt && (
                                            <div className="flex items-start">
                                                <span className="w-32 flex-shrink-0 font-semibold text-gray-700 dark:text-gray-300">Served at:</span>
                                                <p className="flex-1 text-lg text-gray-900 dark:text-gray-100">{new Date(reservation.servedAt).toLocaleString()}</p>
                                            </div>
                                        )}

                                        {/* Dynamic Info Fields */}
                                        {reservation.info && Object.keys(reservation.info).length > 0 && (
                                            <>
                                                <div className="my-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                                                    <h6 className="mb-3 font-semibold text-gray-700 dark:text-gray-300">Customer Information</h6>
                                                    <div className="space-y-4">
                                                        {Object.entries(reservation.info).map(([key, value]) => (
                                                            <div key={key} className="flex items-start">
                                                                <span className="w-32 flex-shrink-0 font-semibold text-gray-700 dark:text-gray-300">{key.replaceAll('_', ' ')}:</span>
                                                                <p className="flex-1 text-lg text-gray-900 dark:text-gray-100">{value as string}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Close Button */}
                                    <div className="mt-6">
                                        <button
                                            className="btn btn-primary w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                            onClick={onClose}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
