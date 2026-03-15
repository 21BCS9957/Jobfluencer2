import { redirect } from 'next/navigation'
import { LayoutDashboard, Plus, FolderOpen, Calendar, MessageSquare, Settings } from 'lucide-react'
import { Sidebar, SidebarItem } from '@/components/shared/Sidebar'
import { NotificationBell } from '@/components/shared/NotificationBell'
import { UserMenu } from '@/components/shared/UserMenu'
import { createClient } from '@/lib/supabase/server'

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
  { name: 'Post Project', href: '/client/post-project', icon: Plus },
  { name: 'My Projects', href: '/client/my-projects', icon: FolderOpen },
  { name: 'Bookings', href: '/client/bookings', icon: Calendar },
  { name: 'Messages', href: '/client/messages', icon: MessageSquare },
  { name: 'Settings', href: '/client/settings', icon: Settings },
]

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // @ts-ignore - Supabase type inference issue
  if (!profile || profile.role !== 'client') {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar items={sidebarItems} />
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Client Dashboard</h1>
            <div className="flex items-center gap-4">
              <NotificationBell userId={user.id} />
              <UserMenu user={user} profile={profile} />
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
