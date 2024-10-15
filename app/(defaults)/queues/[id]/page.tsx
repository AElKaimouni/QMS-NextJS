'use client';

import { Tab } from '@headlessui/react';
import { getTranslation } from '@/i18n';
import { Fragment } from 'react';
import { FiHome } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';

interface QueueDetailsParams {
    params: {
        id: string;
    };
}

export default function QueueDetails({ params }: QueueDetailsParams) {
    const { id } = params;
    const { t, i18n } = getTranslation();

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
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">{t('Serving')} (1)</h2>
                                    {/* <button className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-500 hover:bg-gray-200">Slide for Next Customer</button> */}
                                </div>
                                <div className="rounded-lg bg-gray-50 p-4 dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                    <p className="text-lg font-medium">1: Aicha Ait-Lmaati (Ismail)</p>
                                    <p className="mt-2 text-sm text-gray-600">{t('Serving from')}: 14:32</p>
                                </div>
                                <button className="btn btn-primary max-w-md">
                                    <FaPlus className="mr-3 size-4" />
                                    {t('Call Next')}
                                </button>
                            </div>
                        </div>
                        <div className="relative w-full dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="relative z-10 py-7">
                                <h2 className="mb-4 text-xl font-semibold">{t('Waitlist')} (20)</h2>
                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-lg font-medium">1: Aicha Ait-Lmaati</p>
                                        <p className="mt-2 text-sm text-gray-600">{t('Waited')} 1 minute</p>
                                    </div>
                                    <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-lg font-medium">2: Ismail Ragrag</p>
                                        <p className="mt-2 text-sm text-gray-600">{t('Waited')} 30 minutes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab.Panel>
                <Tab.Panel>
                    <div className="flex h-full w-full flex-col justify-center gap-5 py-5 md:flex-row">
                        <div className="relative w-full dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="relative z-10 py-7">
                                <h2 className="mb-4 text-xl font-semibold">{t('Completed')} (20)</h2>
                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-lg font-medium">1: Aicha Ait-Lmaati</p>
                                        <p className="mt-2 text-sm text-gray-600">{t('Time')}: 1 minute</p>
                                    </div>
                                    <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-lg font-medium">2: Ismail Ragrag</p>
                                        <p className="mt-2 text-sm text-gray-600">{t('Time')}: 30 minutes</p>
                                    </div>
                                    <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-lg font-medium">2: Ismail Ragrag</p>
                                        <p className="mt-2 text-sm text-gray-600">{t('Time')}: 30 minutes</p>
                                    </div>
                                    <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-lg font-medium">2: Ismail Ragrag</p>
                                        <p className="mt-2 text-sm text-gray-600">{t('Time')}: 30 minutes</p>
                                    </div>
                                    <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-lg font-medium">2: Ismail Ragrag</p>
                                        <p className="mt-2 text-sm text-gray-600">{t('Time')}: 30 minutes</p>
                                    </div>
                                    <div className="rounded-xl border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#15253a] dark:shadow-none">
                                        <p className="text-lg font-medium">2: Ismail Ragrag</p>
                                        <p className="mt-2 text-sm text-gray-600">{t('Time')}: 30 minutes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}
