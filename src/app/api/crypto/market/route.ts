import { upbitBaseURL } from '@/domains/crypto/constants';

export const dynamic = 'force-static';

export async function GET() {
  const res = await fetch(`${upbitBaseURL}/market/all`);

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: `Upbit API Error: ${res.status}` }),
      { status: 500 }
    );
  }

  const data = await res.json();
  const krwData = data.filter((item: any) => item.market.includes('KRW'));

  return Response.json(krwData);
}
