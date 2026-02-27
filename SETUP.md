# Job Fluencer - Setup Instructions

## Stage 1: Project Initialization + Supabase Setup ✅

### Prerequisites
- Node.js 18+ installed
- Supabase account created
- Razorpay account (for payments)
- Resend account (for emails)

### 1. Dependencies Installed ✅
All required packages have been installed:
- Supabase SSR & Client
- Razorpay
- Resend
- Zod & React Hook Form
- shadcn/ui components
- Lucide React icons
- Date utilities

### 2. Folder Structure Created ✅
```
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (client)/        # Client dashboard
│   ├── (provider)/      # Provider dashboard
│   ├── (public)/        # Public pages
│   └── api/             # API routes
├── components/
│   ├── ui/              # shadcn components
│   ├── shared/          # Shared components
│   ├── landing/         # Landing page components
│   ├── dashboard/       # Dashboard components
│   └── forms/           # Form components
├── lib/
│   ├── supabase/        # Supabase clients
│   ├── types/           # TypeScript types
│   └── validations/     # Zod schemas
├── hooks/               # Custom React hooks
├── actions/             # Server actions
└── emails/              # Email templates
```

### 3. Environment Variables Setup ✅
File `.env.local` has been created. You need to fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

RESEND_API_KEY=your_resend_key

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Supabase Setup Instructions

#### Step 1: Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Create a new project
3. Copy your project URL and anon key to `.env.local`

#### Step 2: Run SQL Schema
1. Open Supabase SQL Editor
2. Copy the entire content from `supabase-schema.sql`
3. Run the SQL script
4. This will create:
   - All tables (profiles, projects, bookings, etc.)
   - Enums for type safety
   - Triggers for auto-updates
   - Row Level Security policies

#### Step 3: Create Storage Buckets
1. Go to Storage in Supabase Dashboard
2. Create these buckets:
   - `avatars` (Public)
   - `portfolios` (Public)
   - `kyc-documents` (Private)

3. For each bucket, set up policies (uncomment the storage policies at the end of `supabase-schema.sql`)

#### Step 4: Generate TypeScript Types
Run this command after your schema is set up:
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/lib/types/database.ts
```

Replace `YOUR_PROJECT_ID` with your actual Supabase project ID (found in project settings).

### 5. Middleware & Authentication ✅
- Middleware configured to protect routes based on user roles
- Client routes require `role=client`
- Provider routes require `role=provider`
- Unauthenticated users redirected to `/login`

### 6. Server Actions Created ✅
- `auth.actions.ts` - Login, register, logout
- `project.actions.ts` - CRUD for projects
- `booking.actions.ts` - CRUD for bookings
- `provider.actions.ts` - Provider profile management
- `review.actions.ts` - Review management

### 7. Custom Hooks Created ✅
- `useAuth` - Authentication state
- `useRealtimeMessages` - Real-time chat
- `useNotifications` - Real-time notifications

### 8. Validation Schemas ✅
Zod schemas created for:
- Login & Registration
- Projects
- Provider Profiles
- Bookings
- Reviews

### Next Steps

1. **Fill in environment variables** in `.env.local`
2. **Run the SQL schema** in Supabase
3. **Create storage buckets** in Supabase
4. **Generate TypeScript types** using the command above
5. **Test the setup**:
   ```bash
   npm run dev
   ```
6. Visit http://localhost:3000

### Verification Checklist
- [ ] Environment variables filled
- [ ] Supabase schema executed
- [ ] Storage buckets created
- [ ] TypeScript types generated
- [ ] App runs without errors (`npm run dev`)
- [ ] Can access landing page
- [ ] Middleware redirects work

### What's Working Now
- ✅ Project structure
- ✅ Supabase integration
- ✅ Authentication flow (middleware)
- ✅ Route protection
- ✅ Type safety
- ✅ Server actions
- ✅ Validation schemas
- ✅ Email templates
- ✅ shadcn/ui components

### What's Next (Stage 2)
- Implement authentication UI (login/register forms)
- Build landing page
- Create client dashboard
- Create provider dashboard
- Implement project posting
- Build provider profile setup
- Add KYC verification flow

---

## Troubleshooting

### Issue: TypeScript errors in database.ts
**Solution**: Run the type generation command after setting up your Supabase schema

### Issue: Middleware redirects not working
**Solution**: Ensure your Supabase URL and anon key are correct in `.env.local`

### Issue: Storage bucket access denied
**Solution**: Check that RLS policies are set up correctly for storage buckets

---

**Stage 1 Complete!** 🎉

The foundation is ready. Confirm everything works before proceeding to Stage 2.
