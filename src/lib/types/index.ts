import type { Database } from './database'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProviderProfile = Database['public']['Tables']['provider_profiles']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']
export type ProjectInterest = Database['public']['Tables']['project_interests']['Row']
export type MatchRequest = Database['public']['Tables']['match_requests']['Row']

export type UserRole = Database['public']['Enums']['user_role']
export type KYCStatus = Database['public']['Enums']['kyc_status']
export type ProjectStatus = Database['public']['Enums']['project_status']
export type BookingStatus = Database['public']['Enums']['booking_status']
export type PaymentStatus = Database['public']['Enums']['payment_status']
export type CategoryType = Database['public']['Enums']['category_type']
export type NotificationType = Database['public']['Enums']['notification_type']

// Helper types
export type ProfileWithProvider = Profile & {
  provider_profile?: ProviderProfile
}

export type ProjectWithClient = Project & {
  client: Profile
}

export type BookingWithDetails = Booking & {
  client: Profile
  provider: Profile & { provider_profile: ProviderProfile }
  project?: Project
}

export type { Database }
