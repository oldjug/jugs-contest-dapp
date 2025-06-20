// /app/api/task/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, taskKey } = await req.json()

    if (!walletAddress || !taskKey) {
      return NextResponse.json(
        { success: false, error: 'Missing wallet address or task key' },
        { status: 400 }
      )
    }

    // Step 1: Get user by wallet address
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Step 2: Get task details
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('task_key', taskKey)
      .single()

    if (taskError || !task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      )
    }

    // Step 3: Check frequency limit (daily/weekly)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())

    const { data: userTask, error: userTaskError } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('task_id', task.id)
      .single()

    if (task.frequency === 'daily' && userTask && new Date(userTask.completed_at) >= today) {
      return NextResponse.json(
        { success: false, error: 'Already completed today' },
        { status: 403 }
      )
    }

    if (
      task.frequency === 'weekly' &&
      userTask &&
      new Date(userTask.completed_at) >= startOfWeek
    ) {
      return NextResponse.json(
        { success: false, error: 'Already completed this week' },
        { status: 403 }
      )
    }

    // Step 4: Mark task as completed
    await supabase.from('user_tasks').insert({
      user_id: user.id,
      task_id: task.id,
      completed_at: now.toISOString()
    })

    // Step 5: Update unclaimed JUGS balance
    const { error: balanceError } = await supabase.rpc('increment_unclaimed_balance', {
      user_id_input: user.id,
      amount: task.jugs_reward
    })

    if (balanceError) {
      return NextResponse.json(
        { success: false, error: 'Failed to update JUGS balance' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Task completed!' }, { status: 200 })
  } catch (err) {
    console.error('Task completion error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}