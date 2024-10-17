import HomePanel from '@/components/HomePanel';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home Panel',
};

const Sales = () => {
    // return <ComponentsDashboardSales />;
    return <HomePanel />;
};

export default Sales;
