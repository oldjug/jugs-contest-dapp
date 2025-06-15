import { NextRequest, NextResponse } from 'next/server';
import { verifyMessage } from 'viem';
import { createClient } from '@supabase/supabase-js';

// Supabase config
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { address, message, signature } = await req.json();

    if (!address || !message || !signature) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    // Step 1: Verify signature
    const isVerified = await verifyMessage({ address, message, signature });
    if (!isVerified) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 });
    }

    // Step 2: Check if already signed in in last 24h
    const { data: existing, error: fetchError } = await supabase
      .from('signins')
      .select('timestamp')
      .eq('wallet_address', address)
      .order('timestamp', { ascending: false })
      .limit(1);

    if (fetchError) throw fetchError;

    const lastSignIn = existing?.[0]?.timestamp;
    if (lastSignIn) {
      const now = new Date();
      const then = new Date(lastSignIn);
      const hoursPassed = (now.getTime() - then.getTime()) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        return NextResponse.json({ success: false, error: 'Already signed in today' }, { status: 429 });
      }
    }

    // Step 3: Insert sign-in record
    const { error: insertError } = await supabase.from('signins').insert({
      wallet_address: address,
      timestamp: new Date().toISOString()
    });

    if (insertError) throw insertError;

    // Step 4: Upsert user if not exists
    await supabase
      .from('users')
      .upsert({ wallet_address: address }, { onConflict: 'wallet_address' });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Signin error:', err.message || err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

