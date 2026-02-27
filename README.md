# Job Fluencer

A two-sided creative talent marketplace connecting brands/clients with creative professionals (photographers, videographers, editors, social media managers, influencers).

## Tech Stack

- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Backend**: Supabase (Auth, PostgreSQL, Storage, Realtime)
- **Styling**: Tailwind CSS + shadcn/ui
- **Payments**: Razorpay
- **Emails**: Resend
- **Validation**: Zod + React Hook Form

## Quick Start

### Prerequisites

- Node.js 18+
- Supabase account
- Razorpay account (for payments)
- Resend account (for emails)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Follow the detailed guide in [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)
   - Update `.env.local` with your credentials
   - Run the SQL schema from `supabase-schema.sql`
   - Create storage buckets

4. Test Supabase connection:
```bash
npm run test:supabase
```

5. Generate TypeScript types:
```bash
npm run generate:types
```

6. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
src/
├── app/
│   ├── auth/              # Authentication pages (login, register)
│   ├── client/            # Client dashboard & features
│   ├── provider/          # Provider dashboard & features
│   ├── api/               # API routes (webhooks, matching)
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── shared/            # Shared components
│   ├── landing/           # Landing page components
│   ├── dashboard/         # Dashboard components
│   └── forms/             # Form components
├── lib/
│   ├── supabase/          # Supabase client configurations
│   ├── types/             # TypeScript type definitions
│   └── validations/       # Zod validation schemas
├── hooks/                 # Custom React hooks
├── actions/               # Server actions
└── emails/                # Email templates
```

## Features

### For Clients
- Post projects with detailed requirements
- Browse and search creative professionals
- AI-powered provider matching
- Secure booking and payment system
- Real-time messaging with providers
- Review and rating system

### For Providers
- Complete profile with portfolio
- KYC verification for payments
- Browse available opportunities
- Apply to projects
- Earnings dashboard
- Real-time notifications

### Platform Features
- Role-based authentication
- Real-time messaging
- Secure payments with Razorpay
- File storage for portfolios and documents
- Email notifications
- Responsive design

## Environment Variables

Create a `.env.local` file with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:supabase` - Test Supabase connection
- `npm run generate:types` - Generate TypeScript types from Supabase
- `npm run setup` - Run connection test and generate types

## Database Schema

The complete database schema is in `supabase-schema.sql`. It includes:

- **profiles** - User profiles (clients & providers)
- **provider_profiles** - Extended provider information
- **projects** - Client project postings
- **bookings** - Confirmed bookings between clients and providers
- **reviews** - Provider reviews and ratings
- **messages** - Real-time messaging
- **notifications** - User notifications
- **project_interests** - Provider applications to projects
- **match_requests** - AI matching results

## Authentication Flow

1. User registers with email/password
2. Profile automatically created via database trigger
3. Email verification sent
4. User logs in and is redirected based on role:
   - Clients → `/client/dashboard`
   - Providers → `/provider/dashboard`

## Middleware & Route Protection

Routes are protected based on user roles:
- `/client/*` - Requires `role=client`
- `/provider/*` - Requires `role=provider`
- `/auth/*` - Public authentication pages
- `/` - Public landing page

## Development Status

### ✅ Stage 1 Complete
- Project initialization
- Supabase setup
- Database schema
- Authentication flow
- Route protection
- Type safety
- Server actions
- Custom hooks

### 🚧 Stage 2 (Next)
- Authentication UI
- Landing page
- Client dashboard
- Provider dashboard
- Project posting
- Provider profile setup
- KYC verification

## Documentation

- [Setup Guide](./SETUP.md) - Initial setup instructions
- [Supabase Setup](./SUPABASE_SETUP_GUIDE.md) - Detailed Supabase configuration
- [Database Schema](./supabase-schema.sql) - Complete SQL schema

## Contributing

This is a private project. For questions or issues, contact the development team.

## License

Proprietary - All rights reserved

