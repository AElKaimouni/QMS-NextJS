import ComponentsDashboard from '@/components/components-dashboard';
import Link from 'next/link';

export default function Page() {
    return (
        <div className="p-4">
            <ul className="flex space-x-2 text-lg rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
            </ul>
            <ComponentsDashboard />
        </div>
    );
}
