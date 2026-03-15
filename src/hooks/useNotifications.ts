'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Notification } from '@/lib/types'

export function useNotifications(userId: string | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const supabase = createClient()

    // Fetch initial notifications
    const fetchNotifications = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20)

      setNotifications(data || [])
      // @ts-ignore - Supabase type inference issue
      setUnreadCount(data?.filter((n) => !n.is_read).length || 0)
      setLoading(false)
    }

    fetchNotifications()

    // Subscribe to new notifications
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((current) => [payload.new as Notification, ...current])
          setUnreadCount((count) => count + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const markAsRead = async (notificationId: string) => {
    const supabase = createClient()
    await supabase
      .from('notifications')
      // @ts-ignore - Supabase type inference issue
      .update({ is_read: true })
      .eq('id', notificationId)

    setNotifications((current) =>
      current.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
    )
    setUnreadCount((count) => Math.max(0, count - 1))
  }

  return { notifications, unreadCount, loading, markAsRead }
}
