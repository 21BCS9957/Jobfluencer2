# Job Fluencer Setup Checklist

Use this checklist to ensure everything is set up correctly.

## 1. Prerequisites ✓
- [x] Node.js 18+ installed
- [x] npm installed
- [x] Git installed
- [x] Supabase CLI installed (`brew install supabase/tap/supabase`)

## 2. Supabase Setup

### Create Project
- [ ] Go to https://supabase.com/dashboard
- [ ] Create new project or select existing
- [ ] Wait for project to finish provisioning

### Get Credentials
- [ ] Go to Settings → API
- [ ] Copy Project URL
- [ ] Copy anon public key
- [ ] Copy service_role key

### Update Environment
- [ ] Open `.env.local`
- [ ] Paste Supabase URL
- [ ] Paste anon key
- [ ] Paste service role key

### Run SQL Schema
- [ ] Go to SQL Editor in Supabase
- [ ] Open `supabase-schema.sql` file
- [ ] Copy entire content
- [ ] Paste into SQL Editor
- [ ] Click Run
- [ ] Verify no errors

### Create Storage Buckets
- [ ] Go to Storage in Supabase
- [ ] Create `avatars` bucket (Public)
- [ ] Create `portfolios` bucket (Public)
- [ ] Create `kyc-documents` bucket (Private)

### Set Storage Policies
- [ ] Go to SQL Editor
- [ ] Run storage policies from `supabase-schema.sql` (bottom section)
- [ ] Verify policies are created

## 3. Test Connection
```bash
npm run test:supabase
```
- [ ] Connection test passes
- [ ] No errors shown

## 4. Generate Types
```bash
npm run generate:types
```
- [ ] Types generated successfully
- [ ] File `src/lib/types/database.ts` updated

## 5. Optional: Payment & Email Setup

### Razorpay (Optional for now)
- [ ] Create Razorpay account
- [ ] Get API keys
- [ ] Update `.env.local`

### Resend (Optional for now)
- [ ] Create Resend account
- [ ] Get API key
- [ ] Update `.env.local`

## 6. Start Development
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] Can access http://localhost:3000
- [ ] Landing page loads

## 7. Test Routes
- [ ] `/` - Landing page loads
- [ ] `/auth/login` - Login page loads
- [ ] `/auth/register` - Register page loads
- [ ] `/browse` - Browse page loads
- [ ] `/client/dashboard` - Redirects to login (protected)
- [ ] `/provider/dashboard` - Redirects to login (protected)

## 8. Test Authentication (After Stage 2)
- [ ] Can register new user
- [ ] Profile created in database
- [ ] Can login
- [ ] Redirected to correct dashboard based on role
- [ ] Can logout

## Common Issues

### ❌ "relation 'profiles' does not exist"
**Fix**: Run the SQL schema in Supabase SQL Editor

### ❌ "Invalid API key"
**Fix**: Check your anon key in `.env.local` - make sure there are no extra spaces

### ❌ "Failed to generate types"
**Fix**: 
1. Verify project ID is correct
2. Run SQL schema first
3. Check internet connection

### ❌ "Storage bucket not found"
**Fix**: Create the storage buckets in Supabase Dashboard

### ❌ Build errors with TypeScript
**Fix**: Run `npm run generate:types` to get proper types from Supabase

## Next Steps

Once all checkboxes are complete:

1. ✅ Stage 1 is complete!
2. 🚀 Ready to proceed to Stage 2 (UI implementation)
3. 📝 Start building authentication forms
4. 🎨 Create landing page components
5. 📊 Build dashboard interfaces

---

**Current Status**: Stage 1 - Project Initialization ✅

**Next Stage**: Stage 2 - UI Implementation & Authentication
