import { NextResponse } from 'next/server';

// Used by the Dockerfile HEALTHCHECK and EasyPanel's health probe —
// see docs/08-docker-deployment.md.
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
