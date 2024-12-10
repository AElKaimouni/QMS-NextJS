'use client';

import QueueClientFields from '@/components/createqueue/queue-client-fields';
import QueueDescription from '@/components/createqueue/queue-description';
import QueueOperatingTime from '@/components/createqueue/queue-operating-time';
import Loader from '@/components/loader';
import { getTranslation } from '@/i18n';
import { useAppDispatch, useTypedSelector } from '@/store';
import { setQueue } from '@/store/createQueueSlice';
import { useCreateQueueMutation, useLazyGetQueueQuery } from '@/store/services/queue';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { updateWid } from '@/store/createQueueSlice';
import { coloredToast } from './Toast';

const steps = [
    { shortLabel: 'Description', fullLabel: 'Queue Description', component: QueueDescription },
    { shortLabel: 'Hours', fullLabel: 'Operating Hours', component: QueueOperatingTime },
    { shortLabel: 'Fields', fullLabel: 'Client Fields', component: QueueClientFields },
];

const { t } = getTranslation();

interface CreateQueueFormProps {
    params: { wid: string };
}

export default function CreateQueueForm() {
    const searchParams = useSearchParams();

    const isEdit = searchParams.get('edit') === 'true';
    const wid = searchParams.get('wid');

    const [getQueue, { isLoading: loadingQueueData }] = useLazyGetQueueQuery();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isEdit) {
            setCurrentStep(0);
            const editQueueId = searchParams.get('id');
            if (editQueueId) {
                getQueue({ id: editQueueId })
                    .unwrap()
                    .then((res) =>
                        dispatch(
                            setQueue({
                                title: res.title,
                                description: res.description,
                                config: res.config,
                            })
                        )
                    )
                    .catch((e) => console.error(e));
            }
        }
    }, [isEdit]);

    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(0);

    const formData = useTypedSelector((state) => state.createQueue);
    const [createQueue, { isLoading: loadingCreatingMutatiton, error }] = useCreateQueueMutation();

    const errorCreatingMutation = error as { status: number; data: { message: string } };

    const handleNext = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleSubmit = () => {
        if (formData.title === '') {
            alert('Title is required');
            return;
        }
        if (formData.description === '') {
            alert('Description is required');
            return;
        }
        // @ts-ignore
        createQueue({ body: formData, wid })
            .unwrap()
            .then((res) => {
                router.push(`/queues/${res.id}/info`);
            })
            .catch((e) => {
                console.error(e);
                coloredToast('danger', e?.data?.message);
            });
    };

    const CurrentStepComponent = steps[currentStep].component;

    if (isEdit && loadingQueueData) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    if (errorCreatingMutation) {
        return <div>{errorCreatingMutation?.data?.message}</div>;
    }

    return (
        <>
            <ul className="ml-6 flex space-x-2 text-lg rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Queues</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{isEdit ? 'Edit' : 'New'}</span>
                </li>
            </ul>
            <div className="flex h-full items-center justify-center">
                <div className="flex w-full max-w-screen-md flex-col">
                    <div className="sticky left-0 right-0 top-[72px] z-50 w-full flex-[0.5] bg-gray-50 p-4">
                        <ol className="flex w-full items-center justify-center text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                            {steps.map((step, index) => (
                                <li
                                    key={step.fullLabel}
                                    className={`flex items-center whitespace-nowrap ${index <= currentStep ? 'text-blue-600 dark:text-blue-500' : ''} ${
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
                                        <span className="sm:hidden">{t(step.shortLabel)}</span>
                                        <span className="hidden sm:inline-flex">{t(step.fullLabel)}</span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="my-6 px-6">
                        <CurrentStepComponent />
                    </div>

                    <div className="sticky bottom-[76px] left-0 right-0 bg-gray-50 p-4 shadow-md md:bottom-0">
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
            </div>
        </>
    );
}
