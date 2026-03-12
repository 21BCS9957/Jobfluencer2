# Job Fluencer - Complete Project Documentation

A two-sided creative talent marketplace connecting brands/clients with creative professionals (photographers, videographers, editors, social media managers, influencers).

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Quick Start](#quick-start)
3. [Environment Setup](#environment-setup)
4. [Supabase Setup](#supabase-setup)
5. [Gemini AI Setup](#gemini-ai-setup)
6. [Project Structure](#project-structure)
7. [Features](#features)
8. [AI Wizard Details](#ai-wizard-details)
9. [Authentication Flow](#authentication-flow)
10. [Testing](#testing)
11. [Troubleshooting](#troubleshooting)

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Backend**: Supabase (Auth, PostgreSQL, Storage, Realtime)
- **AI**: Google Gemini (gemini-1.5-flash)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Payments**: Razorpay
- **Emails**: Resend
- **Validation**: Zod + React Hook Form

---

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Gemini API key (optional, for AI features)

### Installation

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see next section)

4. Set up Supabase (see Supabase Setup section)

5. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000

---

## Environment Setup

Create a `.env.local` file in the project root:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gemini AI (Optional - wizard works with fallback)
GEMINI_API_KEY=your_gemini_api_key

# Razorpay (Optional - for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Resend (Optional - for emails)
RESEND_API_KEY=your_resend_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Supabase Setup

### Step 1: Get Credentials
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create new)
3. Go to Settings → API
4. Copy:
   - Project URL
   - anon public key
   - service_role key
5. Add to `.env.local`

### Step 2: Run SQL Schema
1. In Supabase Dashboard, go to SQL Editor
2. Copy content from `supabase-schema.sql`
3. Paste and run

This creates:
- All database tables (profiles, projects, bookings, reviews, messages, notifications)
- Enums for type safety
- Triggers for auto-updates
- Row Level Security policies
- Functions for auto-profile creation

### Step 3: Create Storage Buckets

Create these buckets in Storage:

**1. avatars**
- Public: Yes
- File size limit: 2MB
- Allowed MIME types: `image/*`

**2. portfolios**
- Public: Yes
- File size limit: 5MB
- Allowed MIME types: `image/*`

**3. kyc-documents**
- Public: No (Private)
- File size limit: 10MB
- Allowed MIME types: `image/*,application/pdf`

### Step 4: Test Connection
```bash
npm run test:supabase
```

Should see: ✅ Successfully connected to Supabase!

### Step 5: Generate Types
```bash
npm run generate:types
```

---

## Gemini AI Setup (Optional)

The AI wizard works with fallback content, but for best experience:

### Get API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google Account
3. Click "Create API Key"
4. Copy the generated key

### Add to Environment
1. Open `.env.local`
2. Add: `GEMINI_API_KEY=your_key_here`
3. Restart dev server

### Behavior

**Without API key:**
- Uses fallback questions and basic content
- Still fully functional

**With API key:**
- Role-specific AI-generated questions
- Professional AI-written descriptions (200-300 words)
- Auto-detected categories
- 10-15 relevant, specific tags

---

## Project Structure

```
src/
├── app/
│   ├── auth/              # Authentication pages (login, register, verify)
│   ├── client/            # Client dashboard & features
│   ├── provider/          # Provider dashboard & features
│   ├── post-project/      # AI wizard for project posting
│   ├── browse/            # Browse creatives
│   ├── how-it-works/      # Info page
│   ├── api/               # API routes
│   │   ├── generate-content/  # AI content generation
│   │   ├── generate-questions/ # AI question generation
│   │   ├── kyc/           # KYC verification
│   │   ├── match/         # AI matching
│   │   └── webhooks/      # Payment webhooks
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── shared/            # Navbar, Sidebar, UserMenu, NotificationBell
│   ├── landing/           # Landing page sections
│   ├── campaign/          # AI wizard steps
│   └── dashboard/         # Dashboard components
├── lib/
│   ├── supabase/          # Supabase clients (browser, server, middleware)
│   ├── types/             # TypeScript types
│   ├── validations/       # Zod schemas
│   ├── gemini.ts          # Gemini AI config
│   └── campaign-*.ts      # Campaign wizard types/constants
├── hooks/                 # Custom React hooks (useAuth, useNotifications)
├── actions/               # Server actions (auth, projects, bookings)
└── emails/                # Email templates
```

---

## Features

### ✅ Authentication & Authorization
- Email/password authentication
- Role-based access (Client/Provider)
- Email verification
- Password reset
- Protected routes with middleware
- Auto-redirect based on role

### ✅ AI-Powered Project Posting Wizard

**4-Step Simplified Flow:**

**Step 1: Role Selection**
- Choose creative type to hire
- Autocomplete search with 20 role suggestions
- Quick-select chips for popular roles

**Step 2: Project Details (5 Fixed Questions)**
1. Project Title (required)
2. Project Description - client requirements (required, min 100 chars)
3. Influencer Type - 15 categories (required for influencers)
4. Target Audience (optional but recommended)
5. Deliverables (required)
6. Timeline (required)
7. Location (optional, defaults to remote)

**Step 3: Budget Selection**
6 predefined INR ranges:
- ₹0 - ₹5,000 (Small projects)
- ₹5,000 - ₹15,000 (Medium projects)
- ₹15,000 - ₹30,000 (Standard projects)
- ₹30,000 - ₹50,000 (Large projects)
- ₹50,000 - ₹1,00,000 (Premium projects)
- ₹1,00,000+ (Enterprise projects)

**Step 4: Review & Publish**
AI-generated content:
- Professional title (max 60 chars)
- Comprehensive description (200-300 words) including:
  - Project overview
  - Client requirements
  - Target audience
  - Deliverables
  - Timeline and location
  - Role-specific emphasis
  - Call-to-action
- Auto-detected category
- 10-15 relevant, specific tags

**Key Features:**
- No login required to start
- Auth only at publish step
- Campaign data persists during auth flow
- Auto-publish after registration
- Works with or without Gemini API

### ✅ Client Features
- Post projects with AI assistance
- Dashboard with project overview
- Manage bookings
- Real-time messaging
- Review providers

### ✅ Provider Features
- Complete profile with portfolio
- KYC verification
- Browse opportunities
- Apply to projects
- Earnings dashboard
- Real-time notifications

### ✅ Platform Features
- Real-time messaging (Supabase Realtime)
- Notification system with unread counts
- File storage for portfolios/documents
- Responsive design (mobile-first)
- Role-based dashboards
- Animated UI with Framer Motion

---

## AI Wizard Details

### Influencer Types (15 Categories)
- Fashion & Lifestyle
- Food & Beverage
- Tech & Gadgets
- Travel & Adventure
- Fitness & Health
- Beauty & Makeup
- Gaming & Entertainment
- Business & Finance
- Education & Learning
- Parenting & Family
- Home & Decor
- Photography & Art
- Music & Dance
- Sports & Athletics
- Any Category

### Category Auto-Detection
- **Influencers**: Always "influencer"
- **Others**: Detected from role keywords
  - photography
  - videography
  - social_media
  - editing
  - content_creation

### AI Description Quality
Descriptions are:
- 200-300 words long
- Include all project details
- Clearly state client requirements
- Mention target audience
- List expected deliverables
- Include timeline and location
- Use professional, compelling language
- Specific to the project, not generic

### Tags Generation
Tags include:
- Role-specific terms
- Industry/niche keywords
- Deliverable types
- Skills required
- Location (if specified)
- Influencer category terms
- Creative specialization terms

### Fallback (No API Key)
- Uses user's inputs directly
- Auto-detects category from role
- Generates basic but relevant tags
- Still fully functional

---

## Authentication Flow

### Project Posting Flow
1. User visits `/post-project` (no auth required)
2. Completes wizard steps (role, details, budget)
3. AI generates content
4. Reviews campaign
5. Clicks "Create Campaign"
6. **If not authenticated:**
   - Campaign data saved to sessionStorage
   - Redirects to `/auth/register?callback=/post-project`
   - Auto-selects "Client" role
7. User registers/logs in
8. Campaign data restored from sessionStorage
9. Campaign auto-published to database
10. Success screen shown

### Route Protection
- `/client/*` - Requires `role=client`
- `/provider/*` - Requires `role=provider`
- `/post-project` - Public (auth at publish)
- `/auth/*` - Public authentication pages
- `/`, `/browse`, `/how-it-works` - Public pages

---

## Testing

### Setup Verification
- [ ] Environment variables filled in `.env.local`
- [ ] Supabase schema executed
- [ ] Storage buckets created
- [ ] TypeScript types generated
- [ ] Dev server runs without errors
- [ ] Can access landing page

### Authentication
- [ ] Register as Client
- [ ] Register as Provider
- [ ] Login with credentials
- [ ] Password reset works
- [ ] Role-based redirects work
- [ ] Logout works

### AI Wizard (Complete Flow)
- [ ] Visit `/post-project` without login
- [ ] Select role (e.g., "Photographer")
- [ ] Fill all project details
- [ ] Select influencer type (if applicable)
- [ ] Select budget range
- [ ] AI generates content (or fallback)
- [ ] Review screen shows all data
- [ ] Click "Create Campaign"
- [ ] Redirected to register
- [ ] Complete registration
- [ ] Campaign data persists
- [ ] Campaign auto-publishes
- [ ] Success screen displays
- [ ] Campaign appears in database

### Navigation
- [ ] Public navbar works
- [ ] Client sidebar shows correct links
- [ ] Provider sidebar shows correct links
- [ ] Active link highlighting works
- [ ] Mobile responsive

### Notifications
- [ ] Bell shows unread count
- [ ] Mark as read works
- [ ] Real-time updates work

### Landing Page
- [ ] "Create Campaign" button opens `/post-project`
- [ ] "Browse Talent" button opens `/browse`
- [ ] All sections load correctly
- [ ] Mobile responsive

---

## Troubleshooting

### Supabase Connection Issues
**Problem**: Can't connect to Supabase
**Solution**:
- Verify credentials in `.env.local`
- Check SQL schema is executed
- Ensure storage buckets exist
- Run `npm run test:supabase`

### AI Wizard Not Working
**Problem**: Wizard errors or doesn't load
**Solution**:
- Check Gemini API key (optional)
- Verify `/post-project` route is accessible
- Check browser console for errors
- Fallback should work without API key

### Type Errors
**Problem**: TypeScript errors in code
**Solution**:
- Run `npm run generate:types`
- Restart TypeScript server
- Check Supabase schema matches types

### Build Errors
**Problem**: Build fails
**Solution**:
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check all environment variables are set

### Campaign Not Publishing
**Problem**: Campaign doesn't save after registration
**Solution**:
- Check sessionStorage has data
- Verify user is authenticated
- Check Supabase RLS policies
- Look for errors in browser console

### Storage Upload Fails
**Problem**: Can't upload images
**Solution**:
- Verify storage buckets exist
- Check RLS policies for storage
- Ensure file size within limits
- Check MIME type is allowed

---

## Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Testing & Utilities
npm run lint             # Run ESLint
npm run test:supabase    # Test Supabase connection
npm run generate:types   # Generate TypeScript types
npm run setup            # Test connection and generate types
```

---

## Database Schema

Complete schema in `supabase-schema.sql`:

### Tables
- **profiles** - User profiles (both roles)
- **provider_profiles** - Extended provider info
- **projects** - Client project postings
- **bookings** - Confirmed bookings
- **reviews** - Provider reviews/ratings
- **messages** - Real-time chat
- **notifications** - User notifications
- **project_interests** - Provider applications
- **match_requests** - AI matching results

### Enums
- **user_role** - client, provider
- **category_type** - photography, videography, social_media, editing, influencer, content_creation
- **project_status** - draft, open, in_progress, completed, cancelled
- **booking_status** - pending, confirmed, in_progress, completed, cancelled
- **kyc_status** - pending, approved, rejected

---

## Development Status

### ✅ Completed
- Project setup and configuration
- Supabase integration with RLS
- Database schema
- Authentication system
- Route protection middleware
- Client/Provider dashboards
- Shared components (Navbar, Sidebar, UserMenu, NotificationBell)
- Real-time notifications
- AI-powered project wizard (4 steps)
- Campaign data persistence
- Auto-publish after auth
- Landing page with hero section
- Influencer type selection
- Target audience field
- Comprehensive AI descriptions
- Auto-category detection
- Relevant tag generation

### 🚧 In Progress
- Browse/search functionality
- Provider public profiles
- Booking system
- Payment integration
- Messaging system

### 📋 Planned
- AI matching algorithm
- Advanced search filters
- Analytics dashboard
- Email notifications
- Mobile app

---

## Key Implementation Details

### Middleware
- Refreshes session on every request
- Protects routes based on user role
- Redirects unauthenticated users
- Allows public routes without auth

### Server Actions
- `auth.actions.ts` - Login, register, logout, password reset
- `project.actions.ts` - CRUD for projects
- `booking.actions.ts` - CRUD for bookings
- `provider.actions.ts` - Provider profile management
- `review.actions.ts` - Review management

### Custom Hooks
- `useAuth` - Authentication state management
- `useNotifications` - Real-time notifications
- `useRealtimeMessages` - Real-time chat
- `useCampaignStore` - Wizard state management

### API Routes
- `/api/generate-content` - AI content generation
- `/api/generate-questions` - AI question generation (deprecated)
- `/api/kyc` - KYC verification
- `/api/match` - AI matching
- `/api/webhooks/razorpay` - Payment webhooks

---

## Contributing

This is a private project. For questions or issues, contact the development team.

## License

Proprietary - All rights reserved

---

**Last Updated**: Latest context transfer
**Current Version**: Stage 3 Complete (AI Wizard with Improvements)
**Dev Server**: http://localhost:3000
