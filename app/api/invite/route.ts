import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Web3Forms access key (kept server-side). The browser posts the date plan to
// this route; the server (Vercel, unrestricted network) forwards it to
// Web3Forms so the email sends regardless of the visitor's network.
const WEB3FORMS_ACCESS_KEY = '5a9694c1-f378-462e-bb24-1404f503562b';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        ...data,
        // Unique per submission so Web3Forms' duplicate-spam filter doesn't drop repeats.
        submitted_at: new Date().toISOString(),
      }),
    });

    const json = await res.json().catch(() => ({}));
    return NextResponse.json(json, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
