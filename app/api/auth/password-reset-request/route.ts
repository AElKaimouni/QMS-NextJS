import { getApiWithAuth } from '@/apis';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { email } = await request.json();
    const api = getApiWithAuth(request);

    if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    try {
        const res = await api.post('/password-reset-request', { email });

        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        if (error instanceof AxiosError) {
            return NextResponse.json(error.response?.data, { status: error.response?.status });
        }

        console.error(error);
        return NextResponse.json({}, { status: 500 });
    }
}
