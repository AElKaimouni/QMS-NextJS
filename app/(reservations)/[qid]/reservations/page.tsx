'use client';

import { getTranslation } from '@/i18n';
import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '@/components/loader';
import { useConsultQueueQuery } from '@/store/services/queue';
import { useCreateReservationMutation } from '@/store/services/reservation';
import { useRouter } from 'next/navigation';

interface ReservationRegistrationProps {
    params: { qid: string; reservation_id: string };
}

interface Field {
    name: string;
    type: string;
    required: boolean;
}

const getValidationRule = (field: Field) => {
    let rule = Yup.string();

    switch (field.type) {
        case 'EMAIL':
            rule = rule.email('Invalid email address');
            break;
        case 'PHONE':
            rule = rule.matches(/^\+?[\d\s-]+$/, 'Invalid phone number');
            break;
        case 'TEXT':
        default:
            break;
    }

    if (field.required) {
        rule = rule.required(`${field.name} is required`);
    }

    return rule;
};

const generateLabel = (name: string) => {
    return name
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const { t } = getTranslation();

export default function ReservationRegistration({ params }: ReservationRegistrationProps) {
    const { qid } = params;
    const router = useRouter();

    const { data: queue, error: errorQueue, isLoading: loadingQueue } = useConsultQueueQuery({ id: qid });
    const [createReservation, { isLoading: loadingCreateReservation }] = useCreateReservationMutation();

    const { initialValues, validationSchema } = useMemo(() => {
        if (!queue?.config?.fields) {
            return {
                initialValues: {},
                validationSchema: Yup.object().shape({}),
            };
        }

        const values: Record<string, string> = {};
        const schema: Record<string, any> = {};

        queue.config.fields.forEach((field: Field) => {
            values[field.name] = '';
            schema[field.name] = getValidationRule(field);
        });

        return {
            initialValues: values,
            validationSchema: Yup.object().shape(schema),
        };
    }, [queue?.config?.fields]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            createReservation({ queueId: qid, email: values.email, info: values })
                .unwrap()
                .then((res) => {
                    localStorage.setItem('reservation_token', res.token);
                    router.push(`/${qid}/reservations/${res.id}?token=${encodeURIComponent(res.token)}`);
                })
                .catch((e) => {
                    // TODO: proper error handling
                    console.error('Failed to create reservation', e);
                });
        },
        enableReinitialize: true,
    });

    if (loadingQueue) {
        return (
            <div className="flex items-center justify-center p-5">
                <Loader />
            </div>
        );
    }

    if (!queue?.config?.fields) {
        return <div>No form fields found</div>;
    }

    return (
        <div className="flex min-h-[calc(100dvh-72px)] justify-center">
            <form className="max-w-wd mb-4 w-full p-4" onSubmit={formik.handleSubmit}>
                <h1 className="mb-4 text-center text-2xl font-bold">{queue.title}</h1>
                <h2 className="text-md mb-4">{t('Registration Form')}</h2>
                {queue.config.fields.map((field: Field) => (
                    <div key={field.name} className="mb-4">
                        <label className="mb-2 block font-bold text-gray-700" htmlFor={field.name}>
                            {generateLabel(field.name)}
                            {field.required && ' *'}
                        </label>
                        <input
                            className={`form-input ${formik.touched[field.name] && formik.errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                            id={field.name}
                            type={field.type === 'EMAIL' ? 'email' : 'text'}
                            placeholder={`Enter ${generateLabel(field.name)}`}
                            {...formik.getFieldProps(field.name)}
                        />
                        {formik.touched[field.name] && formik.errors[field.name] && <div className="text-sm text-red-500">{formik.errors[field.name]}</div>}
                    </div>
                ))}
                <div className="flex items-center">
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
