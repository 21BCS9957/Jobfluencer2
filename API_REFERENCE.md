# API Quick Reference

## Hooks

### useAuth()
```tsx
import { useAuth } from '@/hooks/useAuth'

const { user, profile, providerProfile, loading, signOut } = useAuth()

// user: Supabase User object
// profile: Profile from profiles table
// providerProfile: Provider profile (if role = 'provider')
// loading: boolean
// signOut: () => Promise<void>
```

### useToast()
```tsx
import { useToast } from '@/hooks/use-toast'

const { toast } = useToast()

toast({
  title: 'Success!',
  description: 'Your changes have been saved.',
})

toast({
  title: 'Error',
  description: 'Something went wrong.',
  variant: 'destructive',
})
```

---

## Server Actions

### Authentication (`src/actions/auth.actions.ts`)

```tsx
import { login, register, logout, resetPassword } from '@/actions/auth.actions'

// Login
await login({ email, password })
// → Redirects to dashboard or onboarding

// Register
await register({ email, password, full_name, role: 'client' | 'provider' })
// → Returns { success, message } or { error }

// Logout
await logout()
// → Redirects to /auth/login

// Reset Password
await resetPassword(email)
// → Sends reset email
```

### Onboarding (`src/actions/onboarding.actions.ts`)

```tsx
import { 
  completeClientOnboarding, 
  completeProviderOnboarding, 
  uploadFile 
} from '@/actions/onboarding.actions'

// Complete client onboarding
await completeClientOnboarding({
  full_name, phone, city, avatar_url,
  company_name, industry, website, bio,
  typical_influencer_types, typical_budget_range
})
// → Redirects to /client/dashboard

// Complete provider onboarding
await completeProviderOnboarding({
  full_name, phone, city, bio, avatar_url,
  categories, years_experience, hourly_rate, daily_rate,
  instagram_url, youtube_url, website_url, portfolio_image_urls
})
// → Redirects to /provider/dashboard

// Upload file
const result = await uploadFile(file, 'avatars', 'profile')
// → Returns { url } or { error }
```

---

## Utilities

### Profile Completeness

```tsx
import { 
  getClientProfileCompleteness, 
  getProviderProfileCompleteness 
} from '@/lib/profile-completeness'

// Client
const { percentage, missing, isComplete } = getClientProfileCompleteness(profile)

// Provider
const { percentage, missing, isComplete } = getProviderProfileCompleteness(
  profile, 
  providerProfile
)
```

---

## Validation Schemas

```tsx
import { 
  loginSchema, 
  registerSchema,
  clientOnboardingSchema,
  providerOnboardingSchema
} from '@/lib/validations'

// Use with react-hook-form
const form = useForm({
  resolver: zodResolver(clientOnboardingSchema),
})
```

---

## React Hook Form Patterns

### Basic Form
```tsx
const { register, handleSubmit, formState: { errors } } = useForm()

<Input {...register('email')} />
{errors.email && <p>{errors.email.message}</p>}
```

### Controller for Select
```tsx
import { Controller } from 'react-hook-form'

const { control } = useForm()

<Controller
  name="industry"
  control={control}
  render={({ field }) => (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tech">Tech</SelectItem>
      </SelectContent>
    </Select>
  )}
/>
```

---

## Database Types

### Profile
```tsx
type Profile = {
  id: string
  role: 'client' | 'provider' | 'admin'
  full_name: string
  email: string
  avatar_url: string | null
  phone: string | null
  city: string | null
  bio: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}
```

### Provider Profile
```tsx
type ProviderProfile = {
  id: string
  categories: string[]
  portfolio_image_urls: string[]
  years_experience: number
  hourly_rate: number | null
  daily_rate: number | null
  instagram_url: string | null
  youtube_url: string | null
  website_url: string | null
  kyc_status: 'pending' | 'submitted' | 'approved' | 'rejected'
  rating: number
  total_reviews: number
  total_earnings: number
  // ... more fields
}
```

---

## Constants

### Categories
```tsx
const CATEGORIES = [
  'photography',
  'videography',
  'social_media',
  'editing',
  'influencer',
  'content_creation',
]
```

### Industries
```tsx
const INDUSTRIES = [
  'Fashion', 'Beauty', 'Tech', 'Food & Beverage',
  'Lifestyle', 'Travel', 'Gaming', 'Health & Fitness', 'Other'
]
```

### Budget Ranges
```tsx
const BUDGET_RANGES = [
  '₹0-5k', '₹5k-15k', '₹15k-30k',
  '₹30k-50k', '₹50k-1L', '₹1L+'
]
```

---

## Middleware

Routes are automatically protected:

- `/client/*` → Requires role = 'client' + complete profile
- `/provider/*` → Requires role = 'provider' + complete profile
- Incomplete profiles → redirect to onboarding
- Not logged in → redirect to `/auth/login`

---

**That's it! 🎉**

## Hooks

### `useAuth()`
Custom hook for managing authentication state.

```typescript
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user, profile, providerProfile, loading, signOut } = useAuth()
  
  if (loading) return <Loader />
  if (!user) return <LoginPrompt />
  
  return <div>Welcome {profile?.full_name}</div>
}
```

**Returns:**
- `user: User | null` - Supabase auth user object
- `profile: Profile | null` - User profile from profiles table
- `providerProfile: ProviderProfile | null` - Provider profile (only if role = 'provider')
- `loading: boolean` - Loading state
- `signOut: () => Promise<void>` - Sign out function

### `useToast()`
Simple toast notification hook.

```typescript
import { useToast } from '@/hooks/use-toast'

function MyComponent() {
  const { toast } = useToast()
  
  const handleSuccess = () => {
    toast({
      title: 'Success!',
      description: 'Your changes have been saved.',
    })
  }
  
  const handleError = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong.',
      variant: 'destructive',
    })
  }
}
```

**Parameters:**
- `title?: string` - Toast title
- `description?: string` - Toast description
- `variant?: 'default' | 'destructive'` - Toast style

## Server Actions

### Authentication Actions (`src/actions/auth.actions.ts`)

#### `login(data: LoginInput)`
Authenticates user and redirects based on profile completeness.

```typescript
import { login } from '@/actions/auth.actions'

const result = await login({
  email: 'user@example.com',
  password: 'password123',
})

if (result?.error) {
  console.error(result.error)
}
// On success, automatically redirects
```

**Parameters:**
- `email: string` - User email
- `password: string` - User password

**Returns:**
- `{ error: string }` on failure
- Redirects on success

**Redirect Logic:**
- Incomplete profile → `/client/onboarding` or `/provider/onboarding`
- Complete profile → `/client/dashboard` or `/provider/dashboard`

#### `register(data: RegisterInput)`
Creates new user account.

```typescript
import { register } from '@/actions/auth.actions'

const result = await register({
  email: 'user@example.com',
  password: 'password123',
  full_name: 'John Doe',
  role: 'client', // or 'provider'
})

if (result?.error) {
  console.error(result.error)
} else {
  console.log(result.message) // "Check your email to verify your account"
}
```

**Parameters:**
- `email: string`
- `password: string`
- `full_name: string`
- `role: 'client' | 'provider'`

**Returns:**
- `{ error: string }` on failure
- `{ success: true, message: string }` on success

#### `resetPassword(email: string)`
Sends password reset email.

```typescript
import { resetPassword } from '@/actions/auth.actions'

const result = await resetPassword('user@example.com')

if (result?.error) {
  console.error(result.error)
} else {
  console.log('Reset email sent')
}
```

#### `logout()`
Signs out user and redirects to login.

```typescript
import { logout } from '@/actions/auth.actions'

await logout()
// Automatically redirects to /auth/login
```

### Onboarding Actions (`src/actions/onboarding.actions.ts`)

#### `completeClientOnboarding(data: ClientOnboardingInput)`
Completes client onboarding and redirects to dashboard.

```typescript
import { completeClientOnboarding } from '@/actions/onboarding.actions'

const result = await completeClientOnboarding({
  full_name: 'John Doe',
  phone: '+91 9876543210',
  city: 'Mumbai',
  avatar_url: 'https://...',
  company_name: 'Acme Inc',
  industry: 'Tech',
  website: 'https://acme.com',
  bio: 'We build amazing products...',
  typical_influencer_types: ['Instagram Influencer', 'YouTube Creator'],
  typical_budget_range: '₹50k-1L',
})

if (result?.error) {
  console.error(result.error)
}
// On success, redirects to /client/dashboard
```

#### `completeProviderOnboarding(data: ProviderOnboardingInput)`
Completes provider onboarding and redirects to dashboard.

```typescript
import { completeProviderOnboarding } from '@/actions/onboarding.actions'

const result = await completeProviderOnboarding({
  full_name: 'Jane Smith',
  phone: '+91 9876543210',
  city: 'Mumbai',
  bio: 'I am a lifestyle influencer...',
  avatar_url: 'https://...',
  categories: ['photography', 'videography'],
  years_experience: '3-5',
  hourly_rate: 2000,
  daily_rate: 10000,
  instagram_url: 'https://instagram.com/jane',
  youtube_url: 'https://youtube.com/@jane',
  website_url: 'https://jane.com',
  portfolio_image_urls: ['https://...', 'https://...'],
})

if (result?.error) {
  console.error(result.error)
}
// On success, redirects to /provider/dashboard
```

#### `uploadFile(file: File, bucket: string, folder: string)`
Uploads file to Supabase Storage.

```typescript
import { uploadFile } from '@/actions/onboarding.actions'

const file = event.target.files[0]
const result = await uploadFile(file, 'avatars', 'profile')

if (result.error) {
  console.error(result.error)
} else {
  console.log('File URL:', result.url)
}
```

**Parameters:**
- `file: File` - File object from input
- `bucket: string` - Storage bucket name ('avatars' or 'portfolios')
- `folder: string` - Subfolder name

**Returns:**
- `{ error: string }` on failure
- `{ url: string }` on success

## Utility Functions

### Profile Completeness (`src/lib/profile-completeness.ts`)

#### `getClientProfileCompleteness(profile: Profile | null)`
Calculates client profile completion.

```typescript
import { getClientProfileCompleteness } from '@/lib/profile-completeness'

const completeness = getClientProfileCompleteness(profile)

console.log(completeness.percentage) // 80
console.log(completeness.missing) // ['Profile Photo']
console.log(completeness.isComplete) // false
```

**Returns:**
```typescript
{
  percentage: number,      // 0-100
  missing: string[],       // Array of missing field labels
  isComplete: boolean      // true if 100% complete
}
```

**Checks:**
- Full Name
- Phone Number
- City
- Bio/Company Description
- Profile Photo

#### `getProviderProfileCompleteness(profile: Profile | null, providerProfile: ProviderProfile | null)`
Calculates provider profile completion.

```typescript
import { getProviderProfileCompleteness } from '@/lib/profile-completeness'

const completeness = getProviderProfileCompleteness(profile, providerProfile)

console.log(completeness.percentage) // 87
console.log(completeness.missing) // ['At least one portfolio image']
console.log(completeness.isComplete) // false
```

**Checks:**
- Full Name
- Phone Number
- City
- Bio
- Profile Photo
- At least one category
- Instagram or YouTube URL
- At least one portfolio image

## Validation Schemas

### Client Onboarding Schema

```typescript
import { clientOnboardingSchema } from '@/lib/validations'

// Use with react-hook-form
const form = useForm({
  resolver: zodResolver(clientOnboardingSchema),
})
```

**Fields:**
- `full_name: string` (min 2 chars)
- `phone: string` (min 10 chars)
- `city: string` (min 2 chars)
- `avatar_url?: string`
- `company_name: string` (min 2 chars)
- `industry: string` (min 2 chars)
- `website?: string` (URL or empty)
- `bio: string` (min 20 chars)
- `typical_influencer_types: string[]` (min 1)
- `typical_budget_range: string` (min 1 char)

### Provider Onboarding Schema

```typescript
import { providerOnboardingSchema } from '@/lib/validations'

const form = useForm({
  resolver: zodResolver(providerOnboardingSchema),
})
```

**Fields:**
- `full_name: string` (min 2 chars)
- `phone: string` (min 10 chars)
- `city: string` (min 2 chars)
- `bio: string` (min 20 chars)
- `avatar_url?: string`
- `categories: string[]` (min 1)
- `years_experience: string` (min 1 char)
- `hourly_rate?: number` (positive)
- `daily_rate?: number` (positive)
- `instagram_url?: string` (URL or empty)
- `youtube_url?: string` (URL or empty)
- `website_url?: string` (URL or empty)
- `portfolio_image_urls?: string[]`

## Middleware

The middleware (`src/middleware.ts`) automatically:

1. **Protects Routes:**
   - `/client/*` requires role = 'client'
   - `/provider/*` requires role = 'provider'

2. **Enforces Onboarding:**
   - Incomplete profile → redirects to onboarding
   - Complete profile → allows dashboard access

3. **Prevents Redundant Access:**
   - Complete profile can't access onboarding
   - Logged-in users can't access auth pages

**Public Routes:**
- `/auth/*`
- `/`
- `/browse`
- `/how-it-works`

## Database Schema

### Profiles Table

```typescript
type Profile = {
  id: string                    // UUID, references auth.users
  role: 'client' | 'provider'   // User role
  full_name: string             // User's full name
  email: string                 // User's email
  avatar_url: string | null     // Profile photo URL
  phone: string | null          // Phone number
  city: string | null           // City/location
  bio: string | null            // Bio or company info (JSON for clients)
  is_active: boolean            // Account status
  created_at: string            // Timestamp
  updated_at: string            // Timestamp
}
```

### Provider Profiles Table

```typescript
type ProviderProfile = {
  id: string                    // UUID, references profiles
  categories: string[]          // Service categories
  portfolio_urls: string[]      // Portfolio links
  portfolio_image_urls: string[] // Portfolio images
  years_experience: number      // Years of experience
  hourly_rate: number | null    // Hourly rate in ₹
  daily_rate: number | null     // Daily rate in ₹
  is_available: boolean         // Availability status
  instagram_url: string | null  // Instagram profile
  youtube_url: string | null    // YouTube channel
  website_url: string | null    // Personal website
  kyc_status: string            // KYC verification status
  rating: number                // Average rating
  total_reviews: number         // Number of reviews
  total_projects: number        // Completed projects
  total_earnings: number        // Total earnings in ₹
  is_featured: boolean          // Featured status
  // ... payment fields
  created_at: string
  updated_at: string
}
```

## Constants

### Categories
```typescript
const CATEGORIES = [
  'photography',
  'videography',
  'social_media',
  'editing',
  'influencer',
  'content_creation',
]
```

### Industries
```typescript
const INDUSTRIES = [
  'Fashion',
  'Beauty',
  'Tech',
  'Food & Beverage',
  'Lifestyle',
  'Travel',
  'Gaming',
  'Health & Fitness',
  'Other',
]
```

### Experience Options
```typescript
const EXPERIENCE_OPTIONS = [
  { value: '0-1', label: '0-1 years' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5+', label: '5+ years' },
]
```

### Budget Ranges
```typescript
const BUDGET_RANGES = [
  '₹0-5k',
  '₹5k-15k',
  '₹15k-30k',
  '₹30k-50k',
  '₹50k-1L',
  '₹1L+',
]
```
