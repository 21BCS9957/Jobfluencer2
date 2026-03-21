'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Star, TrendingUp, Briefcase, DollarSign, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getProviderProfileCompleteness } from '@/lib/profile-completeness'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

const CATEGORY_LABELS: Record<string, string> = {
  photography: 'Photography',
  videography: 'Videography',
  social_media: 'Social Media',
  editing: 'Video Editing',
  influencer: 'Influencer',
  content_creation: 'Content Creation',
}

export default function ProviderDashboardPage() {
  const { user, profile, providerProfile, loading } = useAuth()
  const router = useRouter()
  const [completeness, setCompleteness] = useState<any>(null)

  useEffect(() => {
    if (!loading && profile && providerProfile) {
      const result = getProviderProfileCompleteness(profile, providerProfile)
      setCompleteness(result)
    }
  }, [profile, providerProfile, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  const fullName = profile?.full_name || 'User'
  const categories = providerProfile?.categories || []
  const rating = providerProfile?.rating || 0
  const totalReviews = providerProfile?.total_reviews || 0
  const totalEarnings = providerProfile?.total_earnings || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {fullName}!</h1>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category: string) => (
              <Badge key={category} variant="secondary" className="bg-purple-100 text-purple-700">
                {CATEGORY_LABELS[category] || category}
              </Badge>
            ))}
          </div>
          {rating > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {rating.toFixed(1)} ({totalReviews} reviews)
              </span>
            </div>
          )}
        </div>

        {/* Profile Completeness Alert */}
        {completeness && !completeness.isComplete && (
          <Card className="p-6 mb-8 border-orange-200 bg-orange-50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 mb-2">
                  Complete your profile to get more opportunities
                </h3>
                <Progress value={completeness.percentage} className="mb-3" />
                <p className="text-sm text-orange-800 mb-3">
                  {completeness.percentage}% complete. Missing: {completeness.missing.join(', ')}
                </p>
                <Button
                  size="sm"
                  onClick={() => router.push('/provider/settings')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Complete Profile
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Profile Views</span>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">0</p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Jobs Applied</span>
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">0</p>
            <p className="text-xs text-gray-500 mt-1">Active applications</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Bookings</span>
              <Briefcase className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">0</p>
            <p className="text-xs text-gray-500 mt-1">In progress</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Earnings</span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Find Opportunities</h3>
            <p className="text-gray-600 mb-4">
              Browse available projects that match your skills and interests.
            </p>
            <Button onClick={() => router.push('/provider/opportunities')} className="w-full">
              Browse Jobs
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Complete KYC</h3>
            <p className="text-gray-600 mb-4">
              Verify your identity to unlock payment features and build trust with clients.
            </p>
            <Button
              onClick={() => router.push('/provider/kyc')}
              variant="outline"
              className="w-full"
            >
              Start KYC
            </Button>
          </Card>
        </div>

        {/* Empty State */}
        <Card className="p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No active projects yet</h3>
          <p className="text-gray-600 mb-6">
            Start applying to projects to see them here. Your journey begins now!
          </p>
          <Button onClick={() => router.push('/provider/opportunities')}>
            Explore Opportunities
          </Button>
        </Card>
      </div>
    </div>
  )
}
