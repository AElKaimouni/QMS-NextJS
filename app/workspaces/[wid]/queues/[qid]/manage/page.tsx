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

const rtf = new Intl.RelativeTimeFormat('en', { style: 'short', numeric: 'auto' });
const { t, i18n } = getTranslation();

export default function QueueServing({ params }: QueueDetailsParams) {
    const { qid, wid } = params;

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

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
        { id: qid, page: 1, size: 10, scope: 'all' },
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

            <div className={`mx-6 flex items-center rounded ${queueStatusClasses[queue?.status ?? QueueStatus.CREATED]} p-3.5 dark:bg-primary-dark-light`}>
                <span className="ltr:pl-2 rtl:pr-2">
                    {t('Queue status')}
                    <strong className="ltr:ml-1 rtl:mr-1">{queue?.status}</strong>
                </span>
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

            <Tab.Panels className="p-6 pt-0">
                <Tab.Panel>
                    <div className="flex h-full w-full flex-col justify-center gap-5 py-5 md:flex-row">
                        <div className="relative w-full max-w-sm rounded-xl border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="relative z-10 flex flex-col justify-center gap-3 px-6 py-7">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">
                                        {t('Serving')} ({currentServingList?.length})
                                    </h2>
                                    {fetchingReservations && (
                                        <div className="flex items-center justify-center p-2">
                                            <Loader size="small" />
                                        </div>
                                    )}
                                </div>
                                {currentServingList.length > 0 ? (
                                    <>
                                        {currentServingList.map((currentServing) => (
                                            <div className="rounded-lg bg-gray-50 p-4 dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                                <p className="text-lg font-medium">{currentServing?.email}</p>
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
                                                <div key={served.id} className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                                    <p className="text-lg font-medium">
                                                        {served.position}: {served.email}
                                                    </p>
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
