'use client';
import React from 'react';
import { getTranslation } from '@/i18n';
import { FaHome } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { ImStatsDots } from 'react-icons/im';
import { TiClipboard } from "react-icons/ti";
import { usePathname } from 'next/navigation';
import { MdWorkspaces } from "react-icons/md";
import { FaPlus } from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';
import Link from 'next/link';


const { t } = getTranslation();

const MobileNav = () => {
    const pathname = usePathname();

    const isQueue = pathname.includes('/queues');

    const QueuemenuItems = [
        {
            title: t('home'),
            Icon: FaHome,
            link: '/',
        },
        {
            title: t('analytics'),
            Icon: ImStatsBars,
            link: '/analytics',
        },
        {
            title: t('Manage Queue'),
            Icon: TiClipboard,
            link: '/queue/manage',
        },
        {
            title: t('metrics'),
            Icon: ImStatsDots,
            link: '/metrics',
        },
        {
            title: t('settings'),
            Icon: IoMdSettings,
            link: '/settings',
        },
    ];

    const menuItems = [
        {
            title: t('home'),
            Icon: FaHome,
            link: '/',
        },
        {
            title: t('workspaces'),
            Icon: MdWorkspaces,
            link: '/workspaces',
        },

        {
            title: t('new_queue'),
            Icon: FaPlus,
            link: '/queues/new',
        },
        {
            title: t('metrics'),
            Icon: ImStatsDots,
            link: '/metrics',
        },
        {
            title: t('settings'),
            Icon: IoMdSettings,
            link: '/settings',
        },
    ];

    const menu = isQueue ? QueuemenuItems : menuItems;

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
                                    className={`inline-flex flex-col items-center justify-center px-5 ${index === menuItems.length - 1 ? 'rounded-e-full' : ''} ${
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
