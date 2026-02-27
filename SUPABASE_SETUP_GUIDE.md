# Supabase Setup Guide for Job Fluencer

## Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

## Step 2: Update .env.local

Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Run the SQL Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire content from `supabase-schema.sql` file
4. Paste it into the SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)

This will create:
- All database tables
- Enums for type safety
- Triggers for auto-updates
- Row Level Security policies
- Functions for auto-profile creation

## Step 4: Create Storage Buckets

1. Go to **Storage** in Supabase Dashboard
2. Create these buckets:

### Bucket 1: avatars
- Name: `avatars`
- Public: ✅ Yes
- File size limit: 2MB
- Allowed MIME types: `image/*`

### Bucket 2: portfolios
- Name: `portfolios`
- Public: ✅ Yes
- File size limit: 5MB
- Allowed MIME types: `image/*`

### Bucket 3: kyc-documents
- Name: `kyc-documents`
- Public: ❌ No (Private)
- File size limit: 10MB
- Allowed MIME types: `image/*,application/pdf`

## Step 5: Set Up Storage Policies

After creating buckets, run these SQL commands in SQL Editor:

```sql
-- Avatars bucket policies
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Portfolios bucket policies
CREATE POLICY "Portfolio images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolios');

CREATE POLICY "Providers can upload portfolio images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolios' AND auth.uid()::text = (storage.foldername(name))[1]);

-- KYC documents bucket policies (private)
CREATE POLICY "Only service role can access KYC documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'kyc-documents' AND auth.role() = 'service_role');

CREATE POLICY "Providers can upload their KYC documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'kyc-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Step 6: Test Connection

Run the test script:

```bash
node scripts/test-supabase.js
```

You should see:
```
✅ Successfully connected to Supabase!
✅ Database schema is set up correctly
```

## Step 7: Generate TypeScript Types

Run the type generation script:

```bash
./scripts/generate-types.sh
```

Or manually:
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/lib/types/database.ts
```

Replace `YOUR_PROJECT_ID` with your actual project ID (the part before `.supabase.co` in your URL).

## Step 8: Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Verification Checklist

- [ ] Supabase project created
- [ ] Environment variables updated in `.env.local`
- [ ] SQL schema executed successfully
- [ ] Storage buckets created (avatars, portfolios, kyc-documents)
- [ ] Storage policies set up
- [ ] Connection test passed
- [ ] TypeScript types generated
- [ ] Development server running

## Troubleshooting

### Error: "relation 'profiles' does not exist"
**Solution**: Run the SQL schema in Supabase SQL Editor

### Error: "Invalid API key"
**Solution**: Double-check your anon key in `.env.local`

### Error: "Failed to generate types"
**Solution**: 
1. Verify your project ID is correct
2. Make sure you've run the SQL schema
3. Check your internet connection

### Error: "Storage bucket not found"
**Solution**: Create the storage buckets in Supabase Dashboard

---

## Next Steps After Setup

Once everything is working:

1. Test user registration at `/auth/register`
2. Check if profile is auto-created in database
3. Test login at `/auth/login`
4. Verify middleware redirects work
5. Access protected routes (client/provider dashboards)

---

**Need Help?**

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
