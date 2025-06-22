export const POST = async (req: NextRequest) => {
  try {
    const { walletAddress } = await req.json()

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single()

    if (userError || !user) return NextResponse.json({ success: false, error: 'User not found' })

    const { data: balanceData, error: balanceError } = await supabase
      .from('jugs_balance')
      .select('unclaimed_balance')
      .eq('user_id', user.id)
      .single()

    if (balanceError || balanceData.unclaimed_balance <= 0) {
      return NextResponse.json({ success: false, error: 'No unclaimed JUGS' })
    }

    await supabase.rpc('move_unclaimed_to_claimed', {
      user_id_input: user.id,
      amount: balanceData.unclaimed_balance
    })

    return NextResponse.json({ success: true, message: 'JUGS claimed!' })
  } catch (err) {
    console.error('Claim error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' })
  }
}