import { useCreateWorkspaceMutation } from '@/store/services/workspaces';
import { Transition, Dialog } from '@headlessui/react';
import { useFormik } from 'formik';
import { Fragment } from 'react';
import * as Yup from 'yup';
import { getTranslation } from '@/i18n';

const { t } = getTranslation();

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
    onDismiss: () => void;
}

export const CreateWorkspaceModal = ({ isOpen, onClose, onDismiss }: WorkspaceCreatingModalProps) => {
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
            <Dialog as="div" open={isOpen} onClose={onDismiss}>
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
