'use client';

import React, { useCallback } from 'react';
import DaysCheckbox from "./days-checkbox";
import { useTypedSelector, useAppDispatch } from '@/store';
import { updateStartTime, updateEndTime } from '@/store/createQueueSlice'; 
import { getTranslation } from '@/i18n';

const QueueOperatingTime = () => {
    const { t } = getTranslation();
    const { time } = useTypedSelector((state) => state.createQueue.config);
    const dispatch = useAppDispatch();

    const handleStartTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateStartTime(e.target.value));
    }, [dispatch]);

    const handleEndTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateEndTime(e.target.value));
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-4">
            <div className="mx-auto grid max-w-[16rem] grid-cols-2 gap-4">
                <div>
                    <label htmlFor="start-time" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {t('Start time')}:
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 end-0 top-0 flex items-center pe-3.5">
                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="time"
                            id="start-time"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            min="00:00"
                            max="23:59"
                            value={time?.startTime}
                            onChange={handleStartTimeChange}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="end-time" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {t('End time')}:
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 end-0 top-0 flex items-center pe-3.5">
                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="time"
                            id="end-time"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            min="00:00"
                            max="23:59"
                            value={time?.endTime}
                            onChange={handleEndTimeChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="relative w-full rounded border border-[#e0e6ed] bg-white p-4 shadow dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <DaysCheckbox />
            </div>
        </div>
    );
};

export default QueueOperatingTime;