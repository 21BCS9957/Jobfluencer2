# Job Fluencer

A two-sided creative talent marketplace connecting brands/clients with creative professionals (photographers, videographers, editors, social media managers, influencers).

## Tech Stack

- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Backend**: Supabase (Auth, PostgreSQL, Storage, Realtime)
- **AI**: Google Gemini (gemini-1.5-flash)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Payments**: Razorpay
- **Emails**: Resend
- **Validation**: Zod + React Hook Form

## Quick Start

### Prerequisites

- Node.js 18+
- Supabase account
- Gemini API key (optional, for AI features)
- Razorpay account (for payments)
- Resend account (for emails)

### Installation

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see Environment Variables section below)

4. Set up Supabase (see Supabase Setup section below)

5. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gemini AI (Optional - wizard works with fallback)
GEMINI_API_KEY=your_gemini_api_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Resend
RESEND_API_KEY=your_resend_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Supabase Setup

### 1. Get Credentials
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create new)
3. Go to Settings → API
4. Copy Project URL, anon key, and service_role key

### 2. Run SQL Schema
1. In Supabase Dashboard, go to SQL Editor
2. Copy content from `supabase-schema.sql`
3. Paste and run

### 3. Create Storage Buckets
Create these buckets in Storage:
- `avatars` (public, 2MB, image/*)
- `portfolios` (public, 5MB, image/*)
- `kyc-documents` (private, 10MB, image/*,application/pdf)

### 4. Test Connection
```bash
npm run test:supabase
```

### 5. Generate Types
```bash
npm run generate:types
```

## Gemini AI Setup (Optional)

The AI wizard works with fallback content, but for best experience:

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env.local`: `GEMINI_API_KEY=your_key`
3. Restart dev server

**Without API key**: Uses fallback questions and basic content generation
**With API key**: Role-specific questions and AI-generated descriptions

## Project Structure

```
src/
├── app/
│   ├── auth/              # Authentication pages
│   ├── client/            # Client dashboard & features
│   ├── provider/          # Provider dashboard & features
│   ├── post-project/      # AI wizard for project posting
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── shared/            # Navbar, Sidebar, UserMenu, etc.
│   ├── landing/           # Landing page sections
│   ├── campaign/          # AI wizard steps
│   └── dashboard/         # Dashboard components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── types/             # TypeScript types
│   ├── validations/       # Zod schemas
│   ├── gemini.ts          # Gemini AI config
│   └── campaign-*.ts      # Campaign wizard types/constants
├── hooks/                 # Custom React hooks
├── actions/               # Server actions
└── emails/                # Email templates
```

## Features

### ✅ Authentication & Authorization
- Email/password authentication
- Role-based access (Client/Provider)
- Email verification
- Password reset
- Protected routes with middleware

### ✅ AI-Powered Project Posting Wizard
**4-Step Simplified Flow:**

1. **Role Selection**: Choose creative type to hire
2. **Project Details**: 5 fixed questions
   - Project title
   - Description (client requirements)
   - Influencer type (if applicable)
   - Target audience
   - Deliverables
   - Timeline
   - Location
3. **Budget Selection**: 6 predefined INR ranges
4. **Review & Publish**: AI-generated content
   - Professional title
   - Comprehensive description (200-300 words)
   - Auto-detected category
   - 10-15 relevant tags

**Key Features:**
- No login required to start
- Auth only at publish step
- Campaign data persists during auth
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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:supabase` - Test Supabase connection
- `npm run generate:types` - Generate TypeScript types
- `npm run setup` - Test connection and generate types

## Database Schema

Complete schema in `supabase-schema.sql`:

- **profiles** - User profiles (both roles)
- **provider_profiles** - Extended provider info
- **projects** - Client project postings
- **bookings** - Confirmed bookings
- **reviews** - Provider reviews/ratings
- **messages** - Real-time chat
- **notifications** - User notifications
- **project_interests** - Provider applications
- **match_requests** - AI matching results

## Authentication Flow

1. User visits `/post-project` (no auth required)
2. Completes wizard steps
3. Clicks "Create Campaign"
4. If not authenticated → redirects to register
5. Campaign data saved in sessionStorage
6. After registration → auto-publishes campaign
7. Redirected to success screen

## Route Protection

- `/client/*` - Requires `role=client`
- `/provider/*` - Requires `role=provider`
- `/post-project` - Public (auth at publish)
- `/auth/*` - Public authentication pages
- `/` - Public landing page

## AI Wizard Details

### Fixed Questions (Step 1)
1. Project Title (required)
2. Project Description (required, min 100 chars recommended)
3. Influencer Type (required for influencers, 15 categories)
4. Target Audience (optional but recommended)
5. Deliverables (required)
6. Timeline (required)
7. Location (optional, defaults to remote)

### Budget Ranges (Step 2)
- ₹0 - ₹5,000 (Small projects)
- ₹5,000 - ₹15,000 (Medium projects)
- ₹15,000 - ₹30,000 (Standard projects)
- ₹30,000 - ₹50,000 (Large projects)
- ₹50,000 - ₹1,00,000 (Premium projects)
- ₹1,00,000+ (Enterprise projects)

### AI Generation (After Step 2)
- Professional title (max 60 chars)
- Comprehensive description including:
  - Project overview
  - Client requirements
  - Target audience
  - Deliverables
  - Timeline and location
  - Role-specific emphasis
  - Call-to-action
- Auto-detected category
- 10-15 specific, relevant tags

### Fallback (No API Key)
- Uses user's inputs directly
- Auto-detects category from role
- Generates basic tags
- Still fully functional

## Development Status

### ✅ Completed
- Project setup and configuration
- Supabase integration
- Database schema with RLS
- Authentication system
- Route protection middleware
- Client/Provider dashboards
- Shared components (Navbar, Sidebar, UserMenu)
- Real-time notifications
- AI-powered project wizard
- Campaign data persistence
- Auto-publish after auth

### 🚧 In Progress
- Landing page sections
- Browse/search functionality
- Provider profiles
- Booking system
- Payment integration
- Messaging system

### 📋 Planned
- AI matching algorithm
- Advanced search filters
- Analytics dashboard
- Email notifications
- Mobile app

## Testing Checklist

### Authentication
- [ ] Register as Client
- [ ] Register as Provider
- [ ] Login with credentials
- [ ] Password reset
- [ ] Role-based redirects

### AI Wizard
- [ ] Complete wizard without login
- [ ] AI content generation (or fallback)
- [ ] Campaign data persists during auth
- [ ] Auto-publish after registration
- [ ] Success screen displays
- [ ] Campaign in database

### Navigation
- [ ] Public navbar works
- [ ] Client sidebar shows correct links
- [ ] Provider sidebar shows correct links
- [ ] Active link highlighting
- [ ] Mobile responsive

### Notifications
- [ ] Bell shows unread count
- [ ] Mark as read works
- [ ] Real-time updates

## Troubleshooting

### Supabase Connection Issues
- Verify credentials in `.env.local`
- Check SQL schema is executed
- Ensure storage buckets exist
- Run `npm run test:supabase`

### AI Wizard Not Working
- Check Gemini API key (optional)
- Verify `/post-project` route is accessible
- Check browser console for errors
- Fallback should work without API key

### Type Errors
- Run `npm run generate:types`
- Restart TypeScript server
- Check Supabase schema matches types

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check all environment variables are set

## Contributing

This is a private project. For questions or issues, contact the development team.

## License

Proprietary - All rights reserved
