import { type NextRequest } from 'next/server';
import { upbitBaseURL } from '@/domains/crypto/constants';

// export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const markets = searchParams.get('markets');

  if (!markets) {
    return new Response(
      JSON.stringify({ error: 'Markets parameter is required' }),
      { status: 400 }
    );
  }

  const res = await fetch(`${upbitBaseURL}/ticker?markets=${markets}`);

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: `Upbit API Error: ${res.status}` }),
      { status: 500 }
    );
  }

  const data = await res.json();
  return Response.json(data);
}
