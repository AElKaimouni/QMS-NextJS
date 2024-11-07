'use client';

import { useFormik } from 'formik';
import { useCreateWorkspaceMutation, useUpdateWorkspaceMutation, useLazyGetWorkspaceQuery } from '@/store/services/workspaces';
import * as Yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getTranslation } from '@/i18n';

const { t } = getTranslation();

const NewWorkspace = () => {
    const searchParams = useSearchParams();
    const edit = searchParams.get('edit');
    const id = searchParams.get('id');

    const [getWorkspace] = useLazyGetWorkspaceQuery();
    const [createWorkspace] = useCreateWorkspaceMutation();
    const [updateWorkspace] = useUpdateWorkspaceMutation();

    useEffect(() => {
        if (edit) {
            getWorkspace({ id: Number(id) })
                .unwrap()
                .then((data) => {
                    formik.setFieldValue('title', data.title);
                    formik.setFieldValue('businessName', data.businessName);
                    formik.setFieldValue('businessIndustry', data.businessIndustry);
                    formik.setFieldValue('contactEmail', data.contactEmail);
                    formik.setFieldValue('contactPhone', data.contactPhone);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [edit, id]);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            title: '',
            businessName: '',
            businessIndustry: '',
            contactEmail: '',
            contactPhone: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
            businessName: Yup.string(),
            businessIndustry: Yup.string(),
            contactEmail: Yup.string().email('Invalid email address'),
            contactPhone: Yup.string(),
        }),
        onSubmit: (values) => {
            if (edit) {
                updateWorkspace({
                    id: Number(id),
                    data: { title: values.title, businessName: values.businessName, businessIndustry: values.businessIndustry, contactEmail: values.contactEmail, contactPhone: values.contactPhone },
                })
                    .unwrap()
                    .then(() => {
                        console.log('updated');
                        router.push('/workspaces');
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                return;
            }
            createWorkspace({
                title: values.title,
                businessName: values.businessName,
                businessIndustry: values.businessIndustry,
                contactEmail: values.contactEmail,
                contactPhone: values.contactPhone,
            })
                .unwrap()
                .then(() => {
                    router.push('/workspaces');
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    });

    return (
        <div className="flex max-w-screen-lg flex-col items-center p-4">
            <h1 className="mb-4 text-2xl font-bold">{edit ? t('Edit Workspace') : t('New Workspace')}</h1>
            <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
                <input id="title" name="title" type="text" className="form-input" placeholder={t('Title')} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
                {formik.touched.title && formik.errors.title ? <div style={{ color: 'red' }}>{formik.errors.title}</div> : null}

                <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    className="form-input"
                    placeholder={t('Business Name')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.businessName}
                />
                <input
                    id="businessIndustry"
                    name="businessIndustry"
                    type="text"
                    className="form-input"
                    placeholder={t('Business Industry')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.businessIndustry}
                />
                <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    className="form-input"
                    placeholder={t('Contact Email')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contactEmail}
                />
                {formik && formik.touched.contactEmail && formik.errors.contactEmail ? <div style={{ color: 'red' }}>{formik.errors.contactEmail}</div> : null}
                <input
                    id="contactPhone"
                    name="contactPhone"
                    type="text"
                    className="form-input"
                    placeholder={t('Contact Phone')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contactPhone}
                />
                <button className="btn btn-primary" type="submit">
                    {t('Submit')}
                </button>
            </form>
        </div>
    );
};

export default NewWorkspace;
