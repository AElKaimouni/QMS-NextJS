'use client';

import Dropdown from '@/components/dropdown';
import IconLaptop from '@/components/icon/icon-laptop';
import IconLogout from '@/components/icon/icon-logout';
import IconMoon from '@/components/icon/icon-moon';
import IconSun from '@/components/icon/icon-sun';
import { getTranslation } from '@/i18n';
import { useAppDispatch, useTypedSelector } from '@/store';
import { useGetUserQuery } from '@/store/services/user';
import { toggleRTL, toggleTheme } from '@/store/themeConfigSlice';
import { clearAuth } from '@/store/authSlice';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaHome, FaPlus } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { ImStatsDots } from 'react-icons/im';
import { IoPerson } from 'react-icons/io5';

const { t, i18n } = getTranslation();

const Header = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const wid = '1';
    // const wid = pathname?.split('/workspaces/')[1]?.split('/')[0];
    const queueId = pathname?.split('/queues/')[1]?.split('/')[0];

    const isQueue = pathname?.includes('/queues');
    const last_workspace_id = localStorage.getItem('last_workspace') ?? '1';

    const { data: user } = useGetUserQuery(undefined);

    // const menu = useMemo(() => {
    //     const queueMenu = [
    //         {
    //             title: t('Home'),
    //             Icon: FaHome,
    //             link: `/workspaces/${last_workspace_id}`,
    //         },
    //         {
    //             title: t('Info'),
    //             Icon: FaCircleInfo,
    //             link: `/workspaces/${wid}/queues/${queueId}/info`,
    //         },
    //         {
    //             title: t('Manage'),
    //             Icon: TiClipboard,
    //             link: `/workspaces/${wid}/queues/${queueId}/manage`,
    //         },
    //         {
    //             title: t('Metrics'),
    //             Icon: ImStatsDots,
    //             link: `/workspaces/${wid}/queues/${queueId}/metrics`,
    //         },
    //         {
    //             title: t('Settings'),
    //             Icon: IoMdSettings,
    //             link: `/workspaces/${wid}/queues/${queueId}/settings`,
    //         },
    //     ];

    //     const workspaceMenu = [
    //         {
    //             title: t('Home'),
    //             Icon: FaHome,
    //             link: `/workspaces/${last_workspace_id}`,
    //         },
    //         {
    //             title: t('Workspaces'),
    //             Icon: MdWorkspaces,
    //             link: '/workspaces',
    //         },
    //         {
    //             title: t('New'),
    //             Icon: FaPlus,
    //             link: '/workspaces/new',
    //         },
    //         {
    //             title: t('Metrics'),
    //             Icon: ImStatsDots,
    //             link: `/workspaces/metrics`,
    //         },
    //         {
    //             title: t('Settings'),
    //             Icon: IoMdSettings,
    //             link: `/workspaces/settings`,
    //         },
    //     ];

    //     return isQueue ? queueMenu : workspaceMenu;
    // }, [pathname, last_workspace_id, wid, queueId, isQueue]);

    const menu = [
        {
            title: t('Home'),
            Icon: FaHome,
            link: `/queues`,
        },

        {
            title: t('New queue'),
            Icon: FaPlus,
            link: '/queues/new',
        },
        {
            title: t('Info'),
            Icon: FaCircleInfo,
            link: `/queues/${queueId}/info`,
            disabled: !queueId,
        },
        {
            title: t('Metrics'),
            Icon: ImStatsDots,
            link: `/queues/metrics`,
        },
        // {
        //     title: t('Settings'),
        //     Icon: IoMdSettings,
        //     link: `/queues/${queueId}/settings`,
        // },
    ];

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }

            let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
            for (let i = 0; i < allLinks.length; i++) {
                const element = allLinks[i];
                element?.classList.remove('active');
            }
            selector?.classList.add('active');

            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [pathname]);

    const isRtl = useTypedSelector((state) => state.themeConfig.rtlClass) === 'rtl';

    const themeConfig = useTypedSelector((state) => state.themeConfig);
    const setLocale = (flag: string) => {
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
        router.refresh();
    };

    const handleLogout = () => {
        dispatch(clearAuth());
    };

    return (
        <header className={`z-40 h-24 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center justify-between bg-white px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex items-center justify-between lg:hidden ltr:mr-2 rtl:ml-2">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img className="inline w-28 ltr:-ml-1 rtl:-mr-1" src="/assets/images/quickq.png" alt="logo" />
                            {/* <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300 dark:text-white-light md:inline ltr:ml-1.5 rtl:mr-1.5">QuickQ</span> */}
                        </Link>
                    </div>

                    <div className="flex items-center dark:text-[#d0d2d6] lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                            <ul className="horizontal-menu ml-20 font-semibold text-black !shadow-none md:!flex lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse">
                                {menu.map((m) => (
                                    <li key={m.title} className="menu relative">
                                        <Link href={m.link} type="button" className="nav-link active">
                                            <div className="flex items-center">
                                                <m.Icon className="shrink-0 dark:!text-white-dark" />
                                                <span className="px-1 dark:!text-white-dark">{t(m.title)}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex space-x-1">
                        <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${
                                        themeConfig.theme === 'light' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => dispatch(toggleTheme('dark'))}
                                >
                                    <IconSun />
                                </button>
                            ) : (
                                ''
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'dark' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => dispatch(toggleTheme('system'))}
                                >
                                    <IconMoon />
                                </button>
                            )}
                            {themeConfig.theme === 'system' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'system' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => dispatch(toggleTheme('light'))}
                                >
                                    <IconLaptop />
                                </button>
                            )}
                        </div>
                        {/* <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={i18n.language && <img className="h-5 w-5 rounded-full object-cover" src={`/assets/images/flags/${i18n.language.toUpperCase()}.svg`} alt="flag" />}
                            >
                                <ul className="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    {themeConfig.languageList.map((item: any) => {
                                        return (
                                            <li key={item.code}>
                                                <button
                                                    type="button"
                                                    className={`flex w-full hover:text-primary ${i18n.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                    onClick={() => {
                                                        i18n.changeLanguage(item.code);
                                                        setLocale(item.code);
                                                    }}
                                                >
                                                    <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="h-5 w-5 rounded-full object-cover" />
                                                    <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Dropdown>
                        </div> */}

                        <div className="dropdown !z-50 flex shrink-0">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={<IoPerson className="!z-50 h-9 w-9 rounded-full bg-gray-100 object-cover text-blue-400 saturate-50 group-hover:saturate-100" />}
                            >
                                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <IoPerson className="h-10 w-10 rounded-md object-cover" />
                                            <div className="truncate ltr:pl-4 rtl:pr-4">
                                                <h4 className="text-base">
                                                    {user?.name}
                                                    <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">Pro</span>
                                                </h4>
                                                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                    {user?.email}
                                                </button>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <Link href="/login" onClick={handleLogout} className="!py-3 text-danger">
                                            <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
