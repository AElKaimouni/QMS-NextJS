import { Queue } from "./queue";

export enum ReservationStatus {
    WAITING = 'WAITING',
    SERVING = 'SERVING',
    CANCELED = 'CANCELED',
    SERVED = 'SERVED',
    EXPIRED = 'EXPIRED',
}

export interface Reservation {
    id: string;
    position: number;
    status: ReservationStatus;
    queueId: Queue["id"];
    email: string;
    token: string;
    joinAt: string;
    calledAt?: string;
    servedAt?: string;
}
