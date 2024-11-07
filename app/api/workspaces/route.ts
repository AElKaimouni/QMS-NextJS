import { getApiWithAuth } from '@/apis';
import { QueueCreation } from '@/types/queue';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body: QueueCreation = await request.json();
    const api = getApiWithAuth(request);
    const headers = Object.fromEntries(request.headers.entries());

    const path = request.nextUrl.href.split("/api")[1];

    try {
        const res = await api.post(path, body, { headers});

        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            return NextResponse.json({ message: 'Unvalid Credentails' }, { status: 401 });
        }

        return NextResponse.json({}, { status: 500 });
    }
}
