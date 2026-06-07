import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Web3Forms access key (kept server-side).
const WEB3FORMS_ACCESS_KEY = '5a9694c1-f378-462e-bb24-1404f503562b';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const upstream = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        ...data,
        // Unique per submission so the duplicate-spam filter doesn't drop repeats.
        submitted_at: new Date().toISOString(),
      }),
    });

    const text = await upstream.text();
    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      body = text.slice(0, 200);
    }

    // Always return 200 so the client can read the upstream details (for debugging).
    return NextResponse.json({ ok: upstream.ok, status: upstream.status, body }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 200 });
  }
}
