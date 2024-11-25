import ComponentsAuthRegisterForm from '@/components/auth/components-auth-register-form';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: 'Register Cover',
};

const CoverRegister = () => {
    return (
        <div className="max-h-dvh">
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                
                <div className="relative flex w-full flex-col justify-between rounded-md sm:max-w-[60%] lg:flex-row lg:gap-10 xl:gap-0">


                    <div className="relative flex w-full flex-col items-center justify-center bg-white/60 p-4 backdrop-blur-lg dark:bg-black/50 sm:px-6">
                        <div className="mt-8 w-full max-w-[440px]">
                            <div className="mb-5 text-center flex items-center flex-col">
                                <img src="/assets/images/quickq.png" alt="Logo" className="w-60" />
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Register   </h1>
                                {/* <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p> */}
                            </div>
                            <ComponentsAuthRegisterForm />

                            <div className="mt-10 text-center dark:text-white">
                                Already have an account ?&nbsp;
                                <Link href="/login" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN IN
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverRegister;
