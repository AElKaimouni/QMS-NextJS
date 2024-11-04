import { getApiWithAuth } from '@/apis';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const api = getApiWithAuth(request);
  
  // Get the path from the request URL
  const path = request.nextUrl.href.split("/api")[1];

  try {
    // Make the request to the external API
    const res = await api.get(path, {
      responseType: 'arraybuffer', // Use arraybuffer for binary data
    });

    const filename = 'download.pdf';

    // Create a new response with the appropriate headers
    return new NextResponse(res.data, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
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
