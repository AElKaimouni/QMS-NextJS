'use client';

import QueuesInWorkspace from '@/components/QueuesInWorkspace';

const Workspaces = ({ params }: { params: { wid: string } }) => {
    const { wid } = params;
    return <QueuesInWorkspace wid={wid} />;
};

export default Workspaces;
