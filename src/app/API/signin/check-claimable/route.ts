import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address');
  if (!address) {
    return NextResponse.json({ claimable: false, error: 'Missing address' }, { status: 400 });
  }

  // Get last claim timestamp
  const { data, error } = await supabase
    .from('claims')
    .select('timestamp')
    .eq('wallet', address)
    .order('timestamp', { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    return NextResponse.json({ claimable: false, error: 'Supabase error' }, { status: 500 });
  }

  const lastClaim = data?.[0]?.timestamp;
  const now = new Date();
  let claimable = true;

  if (lastClaim) {
    const diff = now.getTime() - new Date(lastClaim).getTime();
    claimable = diff > 24 * 60 * 60 * 1000; // 24 hours
  }

  return NextResponse.json({ claimable, claimed: !claimable });
}

