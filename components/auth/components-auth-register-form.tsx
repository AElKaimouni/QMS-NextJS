'use client';

import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import IconUser from '@/components/icon/icon-user';
import { useLoginMutation, useRegisterMutation } from '@/store/services/user';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { coloredToast } from '@/components/Toast';
import { useAppDispatch } from '@/store';
import { setAuth } from '@/store/authSlice';

const initialValues: RegisterFormInputs = {
    name: '',
    email: '',
    password: '',
};

const validationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormInputs = z.infer<typeof validationSchema>;

const ComponentsAuthRegisterForm = () => {
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();

    const onSubmit = async (values: RegisterFormInputs) => {
        try {
            await register(values).unwrap();

            const loginResponse = await login({
                email: values.email,
                password: values.password,
            }).unwrap();

            dispatch(setAuth(loginResponse.token));
            router.push('/queues');
        } catch (err: any) {
            coloredToast('danger', err?.data?.message);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={toFormikValidationSchema(validationSchema)} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form className="space-y-5 dark:text-white">
                    <div>
                        <label htmlFor="name">Name</label>
                        <div className="relative text-white-dark">
                            <Field id="name" name="name" type="text" placeholder="Enter Name" className="form-input ps-10 placeholder:text-white-dark" />
                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                <IconUser fill={true} />
                            </span>
                        </div>
                        <ErrorMessage name="name" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <div className="relative text-white-dark">
                            <Field id="email" name="email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                <IconMail fill={true} />
                            </span>
                        </div>
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className="relative text-white-dark">
                            <Field id="password" name="password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                <IconLockDots fill={true} />
                            </span>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <button type="submit" disabled={isSubmitting || isLoading} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                        {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ComponentsAuthRegisterForm;
