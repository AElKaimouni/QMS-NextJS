import { getApiWithAuth } from '@/apis';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const api = getApiWithAuth(request);
  
  const path = request.nextUrl.href.split("/api")[1];

  try {
    const res = await api.get(path, {
      responseType: 'blob',
    });

    const contentDisposition = res.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '') 
      : 'download.pdf';

    return new NextResponse(res.data, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        // Optional: Add content length if available
        ...(res.headers['content-length'] && { 
          'Content-Length': res.headers['content-length'] 
        }),
      },
    });
  } catch (e) {
    if (e instanceof AxiosError) {
      return NextResponse.json({ 
        message: e.response?.data?.message || e.message 
      }, { 
        status: e.response?.status || 500 
      });
    }

    return NextResponse.json({ message: 'An error occurred during PDF download' }, { status: 500 });
  }
}