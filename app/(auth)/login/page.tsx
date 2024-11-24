import ComponentsAuthLoginForm from '@/components/auth/components-auth-login-form';
import LanguageDropdown from '@/components/language-dropdown';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Login Cover',
};

const CoverLogin = () => {
    return (
        <div className="max-h-dvh">
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                {/* <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" /> */}
                <div className="relative flex w-full sm:max-w-[60%] flex-col justify-between rounded-md lg:flex-row lg:gap-10 xl:gap-0">
                    {/* <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent xl:w-16 ltr:-right-10 ltr:bg-gradient-to-r ltr:xl:-right-20 rtl:-left-10 rtl:bg-gradient-to-l rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link href="/" className="ms-10 block w-48 lg:w-72">
                                <img src="/assets/images/quickq_white.png" alt="Logo" className="w-full" />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div> */}

                    <div className="relative flex w-full flex-col items-center justify-center bg-white/60 pb-16 p-4 backdrop-blur-lg dark:bg-black/50 sm:px-6">
                        <img src="/assets/images/quickq.png" alt="Logo" className="w-1/2" />
                        {/* <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link href="/" className="block w-8 lg:hidden">
                                <img src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
                            </Link>
                            <LanguageDropdown className="ms-auto w-max" />
                        </div> */}
                        <div className="mt-8 w-full max-w-[440px]">
                            <div className="mb-5 text-center">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                {/* <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p> */}
                            </div>
                            <ComponentsAuthLoginForm />

                            <div className="mt-5 text-center dark:text-white">
                                <Link href="/password-reset" className="text-center underline">
                                    <p>Forgot you password?</p>
                                </Link>
                            </div>
                            <div className="mt-5 text-center dark:text-white">
                                Don&apos;t have an account ?&nbsp;
                                <Link href="/register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverLogin;
