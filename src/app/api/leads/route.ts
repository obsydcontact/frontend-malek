import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxies lead submissions to the backend so the backend's internal URL
 * is never exposed to the browser bundle. See docs/03-architecture.md
 * § API contract and docs/07-environment-variables.md.
 */
export async function POST(request: NextRequest) {
  const backendUrl = process.env.BACKEND_API_INTERNAL_URL || process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return NextResponse.json({ success: false, error: 'Backend not configured' }, { status: 500 });
  }

  const body = await request.json();

  const forwardedFor = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '';

  try {
    const res = await fetch(`${backendUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': forwardedFor,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to reach backend' }, { status: 502 });
  }
}
