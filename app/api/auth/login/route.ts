import { getApiWithAuth } from '@/apis';
import { LoginDTO, LoginResponseDTO } from '@/types/users';
import { AxiosError, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { email, password }: LoginDTO = await request.json();
    const api = getApiWithAuth(request);

    // Basic validation
    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    try {
        const res = await api.post<LoginDTO, AxiosResponse<LoginResponseDTO>>("/login", { email, password });

        return NextResponse.json(res.data, { status: 200 });
    } catch(error) {
        if(error instanceof AxiosError && error.response?.status === 401) {

            return NextResponse.json({ message: "Unvalid Credentails" }, { status: 401 });
        }

        console.error(error);
        return NextResponse.json({}, { status: 500 });
    }

}
