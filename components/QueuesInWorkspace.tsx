'use client';

import { useDeleteQueueMutation, useLazyGetAllQueuesQuery } from '@/store/services/queue';
import { QueueCard } from './QueueCard';
import IconPlus from '@/components/icon/icon-plus';
import Loader from './loader';
import { getTranslation } from '@/i18n';
import Link from 'next/link';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Select from 'react-select';
import { useCreateWorkspaceMutation, useGetAllWorkspacesQuery } from '@/store/services/workspaces';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const { t } = getTranslation();

export default function QueuesInWorkspace() {
    const { data: workspaces, isLoading: loadingWorkspaces, error: errorWorkspaces } = useGetAllWorkspacesQuery(undefined);

    const [wid, setWid] = useState('1');

    // const { data: queues = [], error, isLoading: isLoadingQueues, isFetching: isFetchingQueues } = useGetAllQueuesQuery({ wid });
    const [getQueuesOfWorkspace, { data: queues = [], error, isLoading: isLoadingQueues, isFetching: isFetchingQueues }] = useLazyGetAllQueuesQuery();
    const [deleteQueue] = useDeleteQueueMutation();

    const errorQueue = error as { message: string };

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
    const [queueIdToDelete, setQueueIdToDelete] = useState('');

    useEffect(() => {
        getQueuesOfWorkspace({ wid });
    }, [wid]);

    const triggerDeleteConfimation = (queueId: string) => {
        setQueueIdToDelete(queueId);
        setDeleteConfirmation(true);
    };

    const handleDeleteQueue = () => {
        deleteQueue({ id: queueIdToDelete })
            .unwrap()
            .then(() => setDeleteConfirmation(false));
        setQueueIdToDelete('');
    };

    const handleCancelDelete = () => {
        setQueueIdToDelete('');
        setDeleteConfirmation(false);
    };

    const handleCancelCreateWorkspace = () => {
        setShowCreateWorkspaceModal(false);
    };

    const handleCreateWorkspace = () => {
        setShowCreateWorkspaceModal(true);
    };

    const selectOptionsWorkspaces = useMemo(() => {
        return workspaces?.map((w) => ({
            label: w.title,
            value: w.id,
        }));
    }, [workspaces]);

    if (isLoadingQueues || isFetchingQueues) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    if (errorQueue) {
        return (
            <div>
                <p className="text-danger">{errorQueue.message}</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
                <Select
                    className="w-full max-w-xl"
                    // @ts-ignore
                    options={selectOptionsWorkspaces}
                    placeholder={t('Select a Workspace')}
                    value={workspaces?.find((w) => w.id === wid)?.title}
                    // @ts-ignore
                    onChange={(newValue) => setWid(newValue?.value ?? '1')}
                    isSearchable={false}
                    isLoading={loadingWorkspaces}
                />
                <button onClick={handleCreateWorkspace} className="btn btn-secondary w-full sm:max-w-56">
                    <IconPlus className="mr-2 text-xl" />
                    {t('Create Workspace')}
                </button>
                <Link href={`/queues/new`} className="btn btn-primary w-full sm:max-w-56">
                    <IconPlus className="mr-2 text-xl" />
                    {t('Create Queue')}
                </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
                {queues
                    .toSorted((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                    .map((queue) => (
                        <QueueCard key={queue.id} queue={queue} triggerDeleteConfimation={triggerDeleteConfimation} />
                    ))}
                <DeleteComfirmationModal isOpen={deleteConfirmation} onClose={handleCancelDelete} onConfirm={handleDeleteQueue} />
                <WorkspaceCreatingModal isOpen={showCreateWorkspaceModal} onClose={handleCancelCreateWorkspace} />
            </div>
        </>
    );
}

const initialValues = {
    title: '',
    businessName: '',
    businessIndustry: '',
    contactEmail: '',
    contactPhone: '',
};

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
    businessName: Yup.string(),
    businessIndustry: Yup.string(),
    contactEmail: Yup.string().email('Invalid email address'),
    contactPhone: Yup.string(),
});

interface WorkspaceCreatingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WorkspaceCreatingModal = ({ isOpen, onClose }: WorkspaceCreatingModalProps) => {
    const [createWorkspace] = useCreateWorkspaceMutation();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            createWorkspace(values)
                .unwrap()
                .then(() => {
                    onClose();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        enableReinitialize: true,
    });

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
                                    <h5 className="text-lg font-bold">{t('Create a new Workspace')}</h5>
                                </div>
                                <div className="p-5">
                                    <form className="max-w-wd mb-4 w-full p-4 sm:max-w-screen-sm" onSubmit={formik.handleSubmit}>
                                        {/* Title Input */}
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                                {t('Title')}
                                            </label>
                                            <input
                                                id="title"
                                                name="title"
                                                type="text"
                                                className="form-input w-full rounded-lg border p-2"
                                                placeholder={t('eg. My business')}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.title}
                                            />
                                            {formik.touched.title && formik.errors.title ? <div className="mt-1 text-sm text-red-600">{formik.errors.title}</div> : null}
                                        </div>

                                        {/* Business Name Input */}
                                        <div className="mb-4">
                                            <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700">
                                                {t('Business Name')}
                                            </label>
                                            <input
                                                id="businessName"
                                                name="businessName"
                                                type="text"
                                                className="form-input w-full rounded-lg border p-2"
                                                placeholder={t('e.g. Acme Corp')}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.businessName}
                                            />
                                        </div>

                                        {/* Business Industry Input */}
                                        <div className="mb-4">
                                            <label htmlFor="businessIndustry" className="block text-sm font-semibold text-gray-700">
                                                {t('Business Industry')}
                                            </label>
                                            <input
                                                id="businessIndustry"
                                                name="businessIndustry"
                                                type="text"
                                                className="form-input w-full rounded-lg border p-2"
                                                placeholder={t('e.g. Technology')}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.businessIndustry}
                                            />
                                        </div>

                                        {/* Contact Email Input */}
                                        <div className="mb-4">
                                            <label htmlFor="contactEmail" className="block text-sm font-semibold text-gray-700">
                                                {t('Contact Email')}
                                            </label>
                                            <input
                                                id="contactEmail"
                                                name="contactEmail"
                                                type="email"
                                                className="form-input w-full rounded-lg border p-2"
                                                placeholder={t('e.g. john.doe@example.com')}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.contactEmail}
                                            />
                                            {formik.touched.contactEmail && formik.errors.contactEmail ? <div className="mt-1 text-sm text-red-600">{formik.errors.contactEmail}</div> : null}
                                        </div>

                                        {/* Contact Phone Input */}
                                        <div className="mb-4">
                                            <label htmlFor="contactPhone" className="block text-sm font-semibold text-gray-700">
                                                {t('Contact Phone')}
                                            </label>
                                            <input
                                                id="contactPhone"
                                                name="contactPhone"
                                                type="text"
                                                className="form-input w-full rounded-lg border p-2"
                                                placeholder={t('e.g. +1 (123) 456-7890')}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.contactPhone}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-4">
                                            <button className="btn btn-primary w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700" type="submit">
                                                {t('Submit')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteComfirmationModal = ({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) => {
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
                                    <h5 className="text-lg font-bold">{t('Delete Queue')}</h5>
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
