import { getApiWithAuth } from '@/apis';
import { LoginDTO, LoginResponseDTO, RegisterDTO, User } from '@/types/users';
import { AxiosError, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
    const { email, password }: RegisterDTO = await request.json();
    const api = getApiWithAuth(request);

    // Basic validation
    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    try {
        
        const rs = await api.post<RegisterDTO>("/register", { email, password });

    } catch(error) {
        if(error instanceof AxiosError && error.response?.status === 409) {
            return NextResponse.json({ message: "Email is already taken" }, { status: 409 });
        }

        console.error(error);
        return NextResponse.json({}, { status: 500 });
    }


    return NextResponse.json({}, { status: 201 });
}
