import ComponentsDashboard from '@/components/components-dashboard';
import Link from 'next/link';

export default function Page() {
    return (
        <div className="p-4">
            <ul className="flex space-x-2 text-lg rtl:space-x-reverse">
                <li>
                    <Link href="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                    
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Home</span>
                </li>
            </ul>
            <ComponentsDashboard />
        </div>
    );
}
