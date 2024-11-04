'use client';

import { getTranslation } from '@/i18n';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaHome, FaPlus } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { ImStatsDots } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';
import { MdWorkspaces } from 'react-icons/md';
import { TiClipboard } from 'react-icons/ti';

import Link from 'next/link';

const { t } = getTranslation();

const MobileNav = () => {
    const pathname = usePathname();

    const wid = pathname?.split('/workspaces/')[1]?.split('/')[0];

    const isQueue = pathname.includes('/queues');

    const queueId = pathname?.split('/queues/')[1]?.split('/')[0];

    const last_workspace_id = localStorage.getItem('last_workspace') ?? '';

    console.log(pathname, wid, queueId, last_workspace_id);

    const queueMenu = [
        {
            title: t('home'),
            Icon: FaHome,
            link: `/workspaces/${last_workspace_id}`,
        },
        {
            title: t('info'),
            Icon: FaCircleInfo,
            link: `/workspaces/${wid}/queues/${queueId}/info`,
        },
        {
            title: t('Manage Queue'),
            Icon: TiClipboard,
            link: `/workspaces/${wid}/queues/${queueId}/manage`,
        },
        {
            title: t('metrics'),
            Icon: ImStatsDots,
            link: `/workspaces/${wid}/queues/${queueId}/metrics`,
        },
        {
            title: t('settings'),
            Icon: IoMdSettings,
            link: `/workspaces/${wid}/queues/${queueId}/settings`,
        },
    ];

    const workspaceMenu = [
        {
            title: t('home'),
            Icon: FaHome,
            link: `/workspaces/${last_workspace_id}`,
        },
        {
            title: t('workspaces'),
            Icon: MdWorkspaces,
            link: '/workspaces',
        },
        {
            title: t('new_queue'),
            Icon: FaPlus,
            link: '/workspaces/new',
        },
        {
            title: t('metrics'),
            Icon: ImStatsDots,
            link: '/workspaces/metrics',
        },
        {
            title: t('settings'),
            Icon: IoMdSettings,
            link: '/workspaces/settings',
        },
    ];

    const menu = isQueue ? queueMenu : workspaceMenu;

    return (
        <div style={{ backgroundColor: 'rgb(250 250 250 / 0.9)' }} className="sticky bottom-0 z-50 w-full md:hidden lg:hidden">
            <div style={{ width: 'calc(100% - 2rem)' }} className="mobile-nav mb-3 ml-3 h-16 max-w-lg rounded-full border border-gray-200 bg-white  dark:border-gray-800 dark:bg-black">
                <div className="mx-auto grid h-full max-w-lg grid-cols-5">
                    {menu.map((item, index) => (
                        <React.Fragment key={item.title}>
                            {item.link === pathname && (
                                <div key={index} className="flex items-center justify-center">
                                    <button
                                        data-tooltip-target="tooltip-new"
                                        type="button"
                                        className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-medium text-gray-100 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                                    >
                                        <item.Icon className="h-5 w-5  group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500" />
                                        <span className="sr-only">{item.title}</span>
                                    </button>
                                </div>
                            )}

                            {item.link !== pathname && (
                                <Link
                                    key={index}
                                    href={item.link}
                                    data-tooltip-target="tooltip-home"
                                    type="button"
                                    className={`inline-flex flex-col items-center justify-center px-5 ${index === workspaceMenu.length - 1 ? 'rounded-e-full' : ''} ${
                                        index === 0 ? 'rounded-s-full' : ''
                                    } group hover:bg-gray-50 dark:hover:bg-gray-800`}
                                >
                                    <item.Icon className="h-5 w-5  text-gray-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" />
                                    <span className="sr-only">{item.title}</span>
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
