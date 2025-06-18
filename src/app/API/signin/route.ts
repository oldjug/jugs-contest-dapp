// src/api/tasks/route.ts
export const POST = async (req: NextRequest) => {
  try {
    const { walletAddress, taskKey } = await req.json()

    // Step 1: Get user ID from wallet address
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single()

    if (userError || !user) {
      return NextResponse.json({ success: false, error: 'User not found' })
    }

    // Step 2: Get task details
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('task_key', taskKey)
      .single()

    if (taskError || !task) {
      return NextResponse.json({ success: false, error: 'Task not found' })
    }

    // Step 3: Check if task can be completed based on frequency
    const { data: userTask, error: userTaskError } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('task_id', task.id)
      .single()

    if (task.frequency === 'daily') {
      const today = new Date().setHours(0, 0, 0, 0)
      if (userTask && userTask.completed_at >= today) {
        return NextResponse.json({ success: false, error: 'Task already completed today' })
      }
    } else if (task.frequency === 'weekly') {
      const startOfWeek = new Date()
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
      startOfWeek.setHours(0, 0, 0, 0)
      if (userTask && userTask.completed_at >= startOfWeek) {
        return NextResponse.json({ success: false, error: 'Task already completed this week' })
      }
    }

    // Step 4: Insert task completion
    const { error: insertError } = await supabase
      .from('user_tasks')
      .insert({
        user_id: user.id,
        task_id: task.id,
        completed_at: new Date().toISOString()
      })

    if (insertError) {
      return NextResponse.json({ success: false, error: 'Task completion failed' })
    }

    // Step 5: Update JUGS balance
    const { error: balanceError } = await supabase
      .from('jugs_balance')
      .upsert(
        {
          user_id: user.id,
          unclaimed_balance: { _inc: task.jugs_reward }, // Increment balance
          last_claimed_at: null // Reset last_claimed_at since balance has changed
        },
        { onConflict: 'user_id' }
      )

    if (balanceError) {
      return NextResponse.json({ success: false, error: 'Failed to update JUGS balance' })
    }

    return NextResponse.json({ success: true, message: 'Task completed successfully' })
  } catch (err) {
    console.error('Task completion error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' })
  }
}