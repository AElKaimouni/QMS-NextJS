export enum QueueStatus {
    CREATED = 'CREATED',
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    CLOSED = 'CLOSED',
    DELETED = 'DELETED',
}

export interface Queue {
    id: string;
    title: string;
    description: string;
    counter: number;
    length: number;
    status: QueueStatus;
    createdAt: string;
    updatedAt?: string | null;
    config?: Record<string, any>;
}

export interface QueueConsultation extends Queue {
    averageServeTime: number;
    averageWaitTime: number;
}
