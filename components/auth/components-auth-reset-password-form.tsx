'use client';

import IconMail from '@/components/icon/icon-mail';
import { useResetPasswordMutation } from '@/store/services/user';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ComponentsAuthResetPasswordForm = () => {
    const [resetPassword] = useResetPasswordMutation();
    const [sent, setSent] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: async (values) => {
            resetPassword({ email: values.email })
                .unwrap()
                .then(() => {
                    setSent(true);
                })
                .catch((e) => {
                    console.error(e);
                });
        },
    });

    return (
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="Email" className="dark:text-white">
                    Email
                </label>
                {!sent ? (
                    <>
                        <div className="relative text-white-dark">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                className="form-input ps-10 placeholder:text-white-dark"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                <IconMail fill={true} />
                            </span>
                        </div>
                        {formik.touched.email && formik.errors.email ? <div className="text-sm text-red-500">{formik.errors.email}</div> : null}
                    </>
                ) : (
                    <div className="text-white-dark">We have sent you an email with instructions to reset your password</div>
                )}
            </div>
            <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                RECOVER
            </button>
        </form>
    );
};

export default ComponentsAuthResetPasswordForm;
