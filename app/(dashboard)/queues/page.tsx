import IconPlus from '@/components/icon/icon-plus';
import QueuesInWorkspace from '@/components/QueuesInWorkspace';
import { getTranslation } from '@/i18n';
import Link from 'next/link';

const { t } = getTranslation();

const Workspaces = () => {
    const wid = '1';
    return (
        <div className="min-h-[calc(100dvh - 72px)] p-6">
            <div className='flex flex-col lg:flex-row'>
                <ul className="flex grow space-x-2 text-lg rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Dashboard
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Queues</span>
                    </li>
                </ul>
                <Link href={`/queues/new`} className="btn btn-primary ml-auto mt-2 sm:absolute sm:right-10">
                    <IconPlus className="mr-2 text-xl" />
                    {t('Create Queue')}
                </Link>
            </div>
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap">
                <QueuesInWorkspace wid={wid} />
            </div>
        </div>
    );
};

export default Workspaces;
