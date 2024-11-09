'use client';

import { getTranslation } from '@/i18n';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaHome, FaPlus } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { ImStatsDots } from 'react-icons/im';
import Link from 'next/link';

const { t } = getTranslation();

const MobileNav = () => {
    const pathname = usePathname();

    const wid = pathname?.split('/workspaces/')[1]?.split('/')[0];
    const queueId = pathname?.split('/queues/')[1]?.split('/')[0];

    const isQueue = pathname?.includes('/queues');
    const last_workspace_id = localStorage.getItem('last_workspace') ?? '1';

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
    //             link: `/workspaces/${wid}/metrics`,
    //         },
    //         {
    //             title: t('Settings'),
    //             Icon: IoMdSettings,
    //             link: `/workspaces/${wid}/settings`,
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
            title: t('New'),
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
    return (
        <div className="sticky bottom-0 z-50 w-full bg-gray-50 dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none md:hidden lg:hidden">
            <div style={{ width: 'calc(100% - 1.5rem)' }} className="mobile-nav mb-3 ml-3 h-16 max-w-lg rounded-full border border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
                <div className="mx-auto grid h-full max-w-lg grid-cols-4">
                    {menu.map((item, index) => {
                        const isActive = item.link === pathname;

                        return (
                            <React.Fragment key={item.title}>
                                {isActive ? (
                                    <div className="flex items-center justify-center">
                                        <button
                                            type="button"
                                            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-medium text-gray-100 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                                        >
                                            <item.Icon className="h-5 w-5 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500" />
                                            <span className="sr-only">{item.title}</span>
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.link}
                                        className={`inline-flex flex-col items-center justify-center px-5 ${index === menu.length - 1 ? 'rounded-e-full' : ''} ${
                                            index === 0 ? 'rounded-s-full' : ''
                                        } group hover:bg-gray-50 dark:hover:bg-gray-800`}
                                    >
                                        <item.Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" />
                                        <span className="mt-1 text-xs">{item.title}</span>
                                    </Link>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
