import { z } from 'zod'

// Auth validations
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['client', 'provider']),
})

// Project validations
export const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['photography', 'videography', 'social_media', 'editing', 'influencer', 'content_creation']),
  budget_min: z.number().positive().optional(),
  budget_max: z.number().positive().optional(),
  location: z.string().optional(),
  is_remote: z.boolean().default(false),
  event_date: z.string().optional(),
  duration_hours: z.number().positive().optional(),
})

// Provider profile validations
export const providerProfileSchema = z.object({
  categories: z.array(z.enum(['photography', 'videography', 'social_media', 'editing', 'influencer', 'content_creation'])),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  years_experience: z.number().min(0),
  hourly_rate: z.number().positive().optional(),
  daily_rate: z.number().positive().optional(),
  city: z.string().min(2),
  instagram_url: z.string().url().optional().or(z.literal('')),
  youtube_url: z.string().url().optional().or(z.literal('')),
  website_url: z.string().url().optional().or(z.literal('')),
})

// Booking validations
export const bookingSchema = z.object({
  provider_id: z.string().uuid(),
  project_id: z.string().uuid().optional(),
  total_amount: z.number().positive(),
  scheduled_date: z.string(),
  scheduled_time: z.string().optional(),
  notes: z.string().optional(),
})

// Review validations
export const reviewSchema = z.object({
  booking_id: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters').optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type ProviderProfileInput = z.infer<typeof providerProfileSchema>
export type BookingInput = z.infer<typeof bookingSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
