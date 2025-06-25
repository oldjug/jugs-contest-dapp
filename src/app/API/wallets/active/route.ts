import { NextResponse } from 'next/server';

export async function GET() {
  const mockCount = 42;
  return NextResponse.json({ count: mockCount });
}
