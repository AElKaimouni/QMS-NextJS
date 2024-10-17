import ComponentsDashboardSales from '@/components/dashboard/components-dashboard-sales';
import IconHome from '@/components/icon/icon-home';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Sales Admin',
};

const NewQueue = () => {
    // return <ComponentsDashboardSales />;
    return (
        <div className='p-6'>
            <div className="mb-5">
                <ol className="flex font-semibold text-gray-500 dark:text-white-dark">
                    <li>
                        <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                            <IconHome className="h-4 w-4" />
                        </button>
                    </li>
                    <li className="before:px-1.5 before:content-['/']">
                        <button type="button">Queues</button>
                    </li>
                    <li className="before:px-1.5 before:content-['/']">
                        <button className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70">New</button>
                    </li>
                </ol>
            </div>
        </div>
    )
};

export default NewQueue;
