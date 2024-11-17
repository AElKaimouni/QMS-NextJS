import QueuesInWorkspace from '@/components/QueuesInWorkspace';
import Link from 'next/link';

const Workspaces = () => {
    const wid = '1';
    return (
        <div className="min-h-[calc(100dvh - 72px)] p-6">
            <ul className="flex space-x-2 text-lg rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Queues</span>
                </li>
            </ul>
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap">
                <QueuesInWorkspace wid={wid} />
            </div>
        </div>
    );
};

export default Workspaces;
