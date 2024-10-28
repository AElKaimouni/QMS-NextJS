'use client';

import React, { useState } from 'react';
import QueueDescription from '@/components/createqueue/queue-description';
import QueueOperatingTime from '@/components/createqueue/queue-operating-time';
import QueueClientFields from '@/components/createqueue/queue-client-fields';
import { useTypedSelector } from '@/store';
import { getTranslation } from '@/i18n';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useCreateQueueMutation } from '@/store/services/queue';
import { useRouter } from 'next/navigation';

const steps = [
    { shortLabel: 'Description', fullLabel: 'Queue Description', component: QueueDescription },
    { shortLabel: 'Hours', fullLabel: 'Operating Hours', component: QueueOperatingTime },
    { shortLabel: 'Fields', fullLabel: 'Client Fields', component: QueueClientFields },
];

export default function CreateQueueForm() {
    const { t } = getTranslation();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(0);

    const formData = useTypedSelector((state) => state.createQueue);
    const [createQueue, { isLoading: loadingCreatingMutatiton, error: errorCreatingMutation }] = useCreateQueueMutation();

    const handleNext = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleSubmit = () => {
        // console.log(formData)
        createQueue(formData)
            .unwrap()
            .then(() => {
                router.push('/');
            });

    };

    const CurrentStepComponent = steps[currentStep].component;

    if (errorCreatingMutation) {
        return <div>{errorCreatingMutation?.message}</div>;
    }

    return (
        <div className="flex min-h-screen flex-col justify-center">
            <div className="sticky left-0 right-0 top-[72px] w-full bg-gray-50 p-4 z-50">
                <ol className="flex w-full items-center justify-center text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                    {steps.map((step, index) => (
                        <li
                            key={step.fullLabel}
                            className={`flex items-center ${index <= currentStep ? 'text-blue-600 dark:text-blue-500' : ''} ${
                                index < steps.length - 1
                                    ? "after:border-1 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10"
                                    : ''
                            }`}
                        >
                            <span
                                className={`flex items-center after:mx-2 after:text-gray-200 ${
                                    index === steps.length - 1 ? "after:content-['']" : "after:content-['/']"
                                } dark:after:text-gray-500 sm:after:hidden`}
                            >
                                {index < currentStep ? (
                                    <svg className="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                ) : (
                                    <span className="me-2">{index + 1}</span>
                                )}
                                <span className="sm:hidden">{step.shortLabel}</span>
                                <span className="hidden sm:inline-flex">{step.fullLabel}</span>
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="px-6 mt-4">
                    <CurrentStepComponent />
            </div>

            <div className="sticky bottom-[76px] left-0 right-0 bg-gray-50 p-4 shadow-md">
                <div className="container mx-auto flex justify-between">
                    <button type="button" onClick={handlePrevious} className={`btn ${currentStep <= 0 ? 'bg-gray-100 shadow-none' : 'shadow'}`} disabled={currentStep <= 0}>
                        <BiLeftArrowAlt className="mr-2 size-5" /> {t('Previous')}
                    </button>
                    {currentStep < steps.length - 1 ? (
                        <button type="button" onClick={handleNext} className="btn btn-primary">
                            {t('Next')} <BiRightArrowAlt className="ml-2 size-5" />
                        </button>
                    ) : (
                        <button onClick={handleSubmit} className="btn btn-success">
                            {loadingCreatingMutatiton && (
                                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-l-transparent align-middle ltr:mr-4 rtl:ml-4"></span>
                            )}
                            {t('Submit')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
