'use client';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import React from 'react';
import { useLoginMutation } from '@/store/services/user';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearAuth, setAuth } from '@/store/authSlice';
import { IRootState } from '@/store';

// Define the validation schema with Zod
const validationSchema = z.object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const ComponentsAuthLoginForm = () => {
    const router = useRouter();
    const [login, { data, isError, error, isLoading }] = useLoginMutation();
    const dispatch = useDispatch();  

    // Initial values for the form
    const initialValues = {
        email: '',
        password: '',
    };

    // Form submission handler
    const onSubmit = async (values: typeof initialValues) => {
        const res = await login(values).unwrap();
        
        dispatch(setAuth(res.token));

        router.push("/");
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(validationSchema)}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-5 dark:text-white">
                    <div>
                        <label htmlFor="email">Email</label>
                        <div className="relative text-white-dark">
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                className="form-input ps-10 placeholder:text-white-dark"
                            />
                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                <IconMail fill={true} />
                            </span>
                        </div>
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className="relative text-white-dark">
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                className="form-input ps-10 placeholder:text-white-dark"
                            />
                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                <IconLockDots fill={true} />
                            </span>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <label className="flex cursor-pointer items-center">
                            <Field type="checkbox" name="rememberMe" className="form-checkbox bg-white dark:bg-black" />
                            <span className="text-white-dark">Remember me</span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                    >
                        {(isSubmitting || isLoading) ? 'Signing in...' : 'Sign in'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ComponentsAuthLoginForm;
