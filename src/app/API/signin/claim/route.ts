import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ success: false, error: 'Missing wallet address' }, { status: 400 });
    }

    const { error } = await supabase.from('claims').insert({
      wallet: address,
      timestamp: new Date().toISOString()
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Claim error:', err.message || err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
