import HomePanel from '@/components/HomePanel';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home Panel',
};

const Sales = () => {
    // return <ComponentsDashboardSales />;
    return <HomePanel />
};

export default Sales;
