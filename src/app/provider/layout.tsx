import { redirect } from 'next/navigation'
import { Sidebar, SidebarItem } from '@/components/shared/Sidebar'
import { NotificationBell } from '@/components/shared/NotificationBell'
import { UserMenu } from '@/components/shared/UserMenu'
import { createClient } from '@/lib/supabase/server'

export default async function ProviderLayout({
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
  if (!profile || profile.role !== 'provider') {
    redirect('/')
  }

  // Get provider profile for KYC status
  const { data: providerProfile } = await supabase
    .from('provider_profiles')
    .select('kyc_status')
    .eq('id', user.id)
    .single()

  // @ts-ignore - Supabase type inference issue
  const kycBadge = providerProfile?.kyc_status === 'approved' 
    ? 'Verified' 
    // @ts-ignore - Supabase type inference issue
    : providerProfile?.kyc_status === 'pending'
    ? 'Pending'
    : 'Required'

  // @ts-ignore - Supabase type inference issue
  const kycBadgeColor = providerProfile?.kyc_status === 'approved'
    ? 'bg-green-100 text-green-700'
    // @ts-ignore - Supabase type inference issue
    : providerProfile?.kyc_status === 'pending'
    ? 'bg-yellow-100 text-yellow-700'
    : 'bg-red-100 text-red-700'

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', href: '/provider/dashboard', icon: 'LayoutDashboard' },
    { name: 'Opportunities', href: '/provider/opportunities', icon: 'Briefcase' },
    { name: 'My Profile', href: '/provider/profile/setup', icon: 'User' },
    { 
      name: 'KYC Verification', 
      href: '/provider/kyc', 
      icon: 'Settings',
      badge: kycBadge,
      badgeColor: kycBadgeColor
    },
    { name: 'Earnings', href: '/provider/earnings', icon: 'DollarSign' },
    { name: 'Messages', href: '/provider/messages', icon: 'MessageSquare' },
    { name: 'Settings', href: '/provider/settings', icon: 'Settings' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar items={sidebarItems} />
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Provider Dashboard</h1>
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
