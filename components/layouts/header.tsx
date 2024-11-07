'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useTypedSelector, useAppDispatch } from '@/store';
import { toggleTheme, toggleRTL } from '@/store/themeConfigSlice';
import Dropdown from '@/components/dropdown';
import IconXCircle from '@/components/icon/icon-x-circle';
import IconSun from '@/components/icon/icon-sun';
import IconMoon from '@/components/icon/icon-moon';
import IconLaptop from '@/components/icon/icon-laptop';
import IconInfoCircle from '@/components/icon/icon-info-circle';
import IconBellBing from '@/components/icon/icon-bell-bing';
import IconUser from '@/components/icon/icon-user';
import IconMail from '@/components/icon/icon-mail';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconLogout from '@/components/icon/icon-logout';
import { usePathname, useRouter } from 'next/navigation';
import { getTranslation } from '@/i18n';
import { ImStatsBars } from 'react-icons/im';
import { FaUsersBetweenLines } from 'react-icons/fa6';
import { FaHome, FaPlus } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { ImStatsDots } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';
import { MdWorkspaces } from 'react-icons/md';
import { TiClipboard } from 'react-icons/ti';

const { t, i18n } = getTranslation();

const Header = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const wid = pathname?.split('/workspaces/')[1]?.split('/')[0];
    const queueId = pathname?.split('/queues/')[1]?.split('/')[0];

    const isQueue = pathname?.includes('/queues');
    const last_workspace_id = localStorage.getItem('last_workspace') ?? '';

    const menu = useMemo(() => {
        const queueMenu = [
            {
                title: t('Home'),
                Icon: FaHome,
                link: `/workspaces/${last_workspace_id}`,
            },
            {
                title: t('Info'),
                Icon: FaCircleInfo,
                link: `/workspaces/${wid}/queues/${queueId}/info`,
            },
            {
                title: t('Manage'),
                Icon: TiClipboard,
                link: `/workspaces/${wid}/queues/${queueId}/manage`,
            },
            {
                title: t('Metrics'),
                Icon: ImStatsDots,
                link: `/workspaces/${wid}/queues/${queueId}/metrics`,
            },
            {
                title: t('Settings'),
                Icon: IoMdSettings,
                link: `/workspaces/${wid}/queues/${queueId}/settings`,
            },
        ];

        const workspaceMenu = [
            {
                title: t('Home'),
                Icon: FaHome,
                link: `/workspaces/${last_workspace_id}`,
            },
            {
                title: t('Workspaces'),
                Icon: MdWorkspaces,
                link: '/workspaces',
            },
            {
                title: t('New'),
                Icon: FaPlus,
                link: '/workspaces/new',
            },
            {
                title: t('Metrics'),
                Icon: ImStatsDots,
                link: `/workspaces/metrics`,
            },
            {
                title: t('Settings'),
                Icon: IoMdSettings,
                link: `/workspaces/settings`,
            },
        ];

        return isQueue ? queueMenu : workspaceMenu;
    }, [pathname, last_workspace_id, wid, queueId, isQueue]);

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

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            profile: 'user-profile.jpeg',
            message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
            time: '45 min ago',
        },
        {
            id: 2,
            profile: 'profile-34.jpeg',
            message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
            time: '9h Ago',
        },
        {
            id: 3,
            profile: 'profile-16.jpeg',
            message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
            time: '9h Ago',
        },
    ]);

    const removeNotification = (value: number) => {
        setNotifications(notifications.filter((user) => user.id !== value));
    };

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center justify-between bg-white px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex items-center justify-between lg:hidden ltr:mr-2 rtl:ml-2">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img className="inline w-8 ltr:-ml-1 rtl:-mr-1" src="/assets/images/logo.svg" alt="logo" />
                            <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300 dark:text-white-light md:inline ltr:ml-1.5 rtl:mr-1.5">VRISTO</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-1.5 dark:text-[#d0d2d6] lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                            <ul className="horizontal-menu ml-20 font-semibold text-black !shadow-none md:!flex lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse">
                                {menu.map((m) => (
                                    <li className="menu relative">
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
                    <div className='flex space-x-1'>
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
                        <div className="dropdown shrink-0">
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
                        </div>
                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={
                                    <span>
                                        <IconBellBing />
                                        <span className="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0">
                                            <span className="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 ltr:-left-[3px] rtl:-right-[3px]"></span>
                                            <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-success"></span>
                                        </span>
                                    </span>
                                }
                            >
                                <ul className="w-[300px] divide-y !py-0 text-dark dark:divide-white/10 dark:text-white-dark sm:w-[350px]">
                                    <li onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-between px-4 py-2 font-semibold">
                                            <h4 className="text-lg">Notification</h4>
                                            {notifications.length ? <span className="badge bg-primary/80">{notifications.length}New</span> : ''}
                                        </div>
                                    </li>
                                    {notifications.length > 0 ? (
                                        <>
                                            {notifications.map((notification) => {
                                                return (
                                                    <li key={notification.id} className="dark:text-white-light/90" onClick={(e) => e.stopPropagation()}>
                                                        <div className="group flex items-center px-4 py-2">
                                                            <div className="grid place-content-center rounded">
                                                                <div className="relative h-12 w-12">
                                                                    <img className="h-12 w-12 rounded-full object-cover" alt="profile" src={`/assets/images/${notification.profile}`} />
                                                                    <span className="absolute bottom-0 right-[6px] block h-2 w-2 rounded-full bg-success"></span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-auto ltr:pl-3 rtl:pr-3">
                                                                <div className="ltr:pr-3 rtl:pl-3">
                                                                    <h6
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: notification.message,
                                                                        }}
                                                                    ></h6>
                                                                    <span className="block text-xs font-normal dark:text-gray-500">{notification.time}</span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="text-neutral-300 opacity-0 hover:text-danger group-hover:opacity-100 ltr:ml-auto rtl:mr-auto"
                                                                    onClick={() => removeNotification(notification.id)}
                                                                >
                                                                    <IconXCircle />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                            <li>
                                                <div className="p-4">
                                                    <button className="btn btn-primary btn-small block w-full">Read All Notifications</button>
                                                </div>
                                            </li>
                                        </>
                                    ) : (
                                        <li onClick={(e) => e.stopPropagation()}>
                                            <button type="button" className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent">
                                                <div className="mx-auto mb-4 rounded-full ring-4 ring-primary/30">
                                                    <IconInfoCircle fill={true} className="h-10 w-10 text-primary" />
                                                </div>
                                                No data available.
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </Dropdown>
                        </div>
                        <div className="dropdown flex shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={<img className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/assets/images/user-profile.jpeg" alt="userProfile" />}
                            >
                                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img className="h-10 w-10 rounded-md object-cover" src="/assets/images/user-profile.jpeg" alt="userProfile" />
                                            <div className="truncate ltr:pl-4 rtl:pr-4">
                                                <h4 className="text-base">
                                                    John Doe
                                                    <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">Pro</span>
                                                </h4>
                                                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                    johndoe@gmail.com
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="/users/profile" className="dark:hover:text-white">
                                            <IconUser className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/apps/mailbox" className="dark:hover:text-white">
                                            <IconMail className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                            Inbox
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/auth/boxed-lockscreen" className="dark:hover:text-white">
                                            <IconLockDots className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                            Lock Screen
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <Link href="/auth/boxed-signin" className="!py-3 text-danger">
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
