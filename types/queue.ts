export enum QueueStatus {
    CREATED = 'CREATED',
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    CLOSED = 'CLOSED',
    DELETED = 'DELETED',
}

export enum FieldType {
    TEXT = 'TEXT',
    BOOLEAN = 'BOOLEAN',
    NUMBER = 'NUMBER',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    DATE = 'DATE',
}

export interface Queue {
    id: string;
    title: string;
    workspaceId: number;
    userId: number;
    description: string;
    counter: number;
    length: number;
    status: QueueStatus;
    createdAt: string;
    updatedAt?: string | null;
    config: Record<string, any> | null;
}

export interface QueueConsultation {
    id: string;
    title: string;
    description: string;
    counter: number;
    length: number;
    status: QueueStatus;
    config: Record<string, any> | null;
    averageServeTime: number;
}

export interface QueueCreation {
    title: string;
    description: string;
    wid: string;
    config: {
        time?: {
            days: number[];
            startTime: string;
            endTime: string;
        };
        fields?: {
            name: string;
            type: FieldType;
            required: boolean;
        }[];
    };
}
