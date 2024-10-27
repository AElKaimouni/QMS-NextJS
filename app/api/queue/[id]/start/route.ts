import { getApiWithAuth } from '@/apis';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const api = getApiWithAuth(request);

    // Use request.nextUrl.pathname to extract the correct API path
    const path = request.nextUrl.pathname.replace('/api', '');

    try {
        const res = await api.post(path); // Axios already infers the response type

        return NextResponse.json(res.data, { status: 200 });
    } catch (e) {
        if (e instanceof AxiosError) {
            return NextResponse.json({ message: e.message }, { status: e.response?.status || 500 });
        }

        console.error(e, 'A non-Axios error occurred');
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}
