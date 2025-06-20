// src/components/DashboardContent.tsx

'use client'

import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabaseClient'

export default function DashboardContent() {
  const { address } = useAccount()
  const [walletAddress, setWalletAddress] = useState('')
  const [tasks, setTasks] = useState<any[]>([])
  const [balance, setBalance] = useState({ claimed: 0, unclaimed: 0 })
  const [entries, setEntries] = useState(0)

  // Load wallet address when connected
  useEffect(() => {
    if (address) {
      setWalletAddress(address)
      fetchTasks()
      fetchBalance()
      fetchEntries()
    }
  }, [address])

  // Fetch all available tasks and user task status
  const fetchTasks = async () => {
    const { data: allTasks, error: tasksError } = await supabase.from('tasks').select('*')
    if (!tasksError && allTasks) {
      setTasks(allTasks)
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', address)
      .single()

    if (!userError && user) {
      const { data: userTasks, error: utError } = await supabase
        .from('user_tasks')
        .select('task_id, completed_at')
        .eq('user_id', user.id)

      if (!utError && userTasks) {
        const updatedTasks = allTasks.map((task: any) => {
          const found = userTasks.find((ut: any) => ut.task_id === task.id)
          return found ? { ...task, completed: true, completed_at: found.completed_at } : task
        })
        setTasks(updatedTasks)
      }
    }
  }

  // Fetch JUGS balance
  const fetchBalance = async () => {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', address)
      .single()

    if (!userError && user) {
      const { data, error } = await supabase
        .from('jugs_balance')
        .select('claimed_balance, unclaimed_balance')
        .eq('user_id', user.id)
        .single()

      if (!error && data) {
        setBalance({
          claimed: data.claimed_balance,
          unclaimed: data.unclaimed_balance
        })
      }
    }
  }

  // Fetch total entries
  const fetchEntries = async () => {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', address)
      .single()

    if (!userError && user) {
      const { data, error } = await supabase
        .from('entries')
        .select('SUM(entry_count)')
        .eq('user_id', user.id)

      if (!error && data?.length > 0) {
        setEntries(parseInt(data[0].sum || 0))
      }
    }
  }

  // Handle task completion
  const handleCompleteTask = async (taskKey: string) => {
    const res = await fetch('/api/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, taskKey })
    })

    const result = await res.json()
    if (result.success) {
      alert('✅ Task completed!')
      fetchTasks()
      fetchBalance()
    } else {
      alert(result.message || '❌ Failed to complete task.')
    }
  }

  // Handle JUGS claim
  const handleClaimJugs = async () => {
    const res = await fetch('/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress })
    })

    const result = await res.json()
    if (result.success) {
      alert(`💰 ${result.message}`)
      fetchBalance()
    } else {
      alert(result.message || '❌ Failed to claim JUGS.')
    }
  }

  // Handle Drum Entry
  const handleEnterDrum = async () => {
    const jugsToSpend = 50 // Adjust based on your entry cost

    if (balance.claimed < jugsToSpend) {
      alert('❌ Not enough JUGS to enter drum.')
      return
    }

    const res = await fetch('/api/drum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, jugsToSpend })
    })

    const result = await res.json()
    if (result.success) {
      alert(`🎉 ${result.message}`)
      fetchBalance()
      fetchEntries()
    } else {
      alert(result.message || '❌ Failed to enter drum.')
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Jug’s Drive Dashboard</h1>

      {/* Task List */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Tasks</h2>
        <ul className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className="border border-gray-700 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <strong>{task.task_name}</strong> ({task.jugs_reward} JUGS)
                  <p className="text-sm text-gray-400">{task.description}</p>
                  {task.completed && (
                    <span className="text-green-400 text-xs">
                      Completed on {new Date(task.completed_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {!task.completed && (
                  <button
                    onClick={() => handleCompleteTask(task.task_key)}
                    className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
                  >
                    Complete
                  </button>
                )}
                {task.completed && <span className="text-gray-400">✓</span>}
              </li>
            ))
          ) : (
            <p>No tasks found.</p>
          )}
        </ul>
      </section>

      {/* Balance Info */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your JUGS Balance</h2>
        <p>Claimed: <strong>{balance.claimed}</strong></p>
        <p>Unclaimed: <strong>{balance.unclaimed}</strong></p>
        {balance.unclaimed > 0 && (
          <button
            onClick={handleClaimJugs}
            className="mt-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
          >
            Claim {balance.unclaimed} JUGS
          </button>
        )}
      </section>

      {/* Drum Entry */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Jugs Rewards Drum</h2>
        <p>Total Entries: <strong>{entries}</strong></p>
        <button
          onClick={handleEnterDrum}
          disabled={balance.claimed < 50}
          className={`mt-2 px-4 py-2 rounded ${
            balance.claimed >= 50
              ? 'bg-purple-600 hover:bg-purple-800 text-white'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          Enter Drum (50 JUGS)
        </button>
      </section>

      {/* Back to Home Button */}
      <div className="text-center mt-8">
        <Link href="/">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}