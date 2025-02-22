import { upbitBaseURL } from '@/domains/crypto/constants';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const markets = searchParams.get('markets');
  if (!markets) {
    return new Response(
      JSON.stringify({ error: 'Markets parameter is required' }),
      { status: 400 }
    );
  }

  const res = await fetch(`${upbitBaseURL}/v1/ticker?markets=${markets}`);
  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: `Upbit API Error: ${res.status}` }),
      { status: 500 }
    );
  }

  const data = await res.json();
  return Response.json(data);
}
