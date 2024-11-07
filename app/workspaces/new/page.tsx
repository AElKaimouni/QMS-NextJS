'use client';

import { useFormik } from 'formik';
import { useCreateWorkspaceMutation, useUpdateWorkspaceMutation, useLazyGetWorkspaceQuery } from '@/store/services/workspaces';
import * as Yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getTranslation } from '@/i18n';

const { t } = getTranslation();

interface PageProps  {
    wid: string;
}

const NewWorkspace = ({wid}: PageProps ) => {
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
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
        }),
        onSubmit: (values) => {
            if (edit) {
                updateWorkspace({ id: Number(id), data: { title: values.title } })
                    .then(() => {
                        router.push('/workspaces');
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                return;
            }
            createWorkspace({ title: values.title }).then(() => {
                router.push('/workspaces');
            });
        },
    });

    return (
        <div className="flex w-full flex-col items-center p-4">
            <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
                <div>
                    <input id="title" name="title" type="text" className="form-input" placeholder={t('Title')} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
                    {formik.touched.title && formik.errors.title ? <div style={{ color: 'red' }}>{formik.errors.title}</div> : null}
                </div>
                <button className="btn btn-primary" type="submit">
                    {t('Submit')}
                </button>
            </form>
        </div>
    );
};

export default NewWorkspace;
