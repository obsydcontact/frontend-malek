import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const backendUrl = process.env.BACKEND_API_INTERNAL_URL || process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return NextResponse.json({ success: false, error: 'Backend not configured' }, { status: 500 });
  }

  const body = await request.json();

  try {
    const res = await fetch(`${backendUrl}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to reach backend' }, { status: 502 });
  }
}
