import { getApiWithAuth } from '@/apis';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const api = getApiWithAuth(request);
  
  // Use request.nextUrl.pathname to extract the correct API path
  const path = request.nextUrl.href.split("/api")[1]; 

  try {
    const res = await api.get(path);  // Axios already infers the response type

    return NextResponse.json(res.data, { status: 200 });
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e);
      return NextResponse.json({ message: e.message }, { status: e.response?.status || 500 });
    }

    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const api = getApiWithAuth(request);
  
  // Use request.nextUrl.pathname to extract the correct API path
  const path = request.nextUrl.href.split("/api")[1]; 

  try {
    const res = await api.delete(path);  // Axios already infers the response type

    return NextResponse.json(res.data, { status: 200 });
  } catch (e) {
    if (e instanceof AxiosError) {
      return NextResponse.json({ message: e.message }, { status: e.response?.status || 500 });
    }

    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}