# Quick Setup Guide

## Prerequisites Checklist

- [ ] Supabase project created
- [ ] Database schema applied (`supabase-schema.sql`)
- [ ] Storage buckets created (`avatars`, `portfolios`)
- [ ] Environment variables set (`.env.local`)

---

## 1. Database Setup

### Run Schema
1. Open Supabase Dashboard → SQL Editor
2. Copy entire content from `supabase-schema.sql`
3. Paste and run
4. Verify: Check that `profiles` and `provider_profiles` tables exist

### Verify Trigger
```sql
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```
Should return 1 row.

---

## 2. Storage Buckets

### Create Buckets
1. Supabase Dashboard → Storage
2. Create `avatars` bucket (Public)
3. Create `portfolios` bucket (Public)

### Apply Policies
Run in SQL Editor:
```sql
-- Avatars
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Portfolios
CREATE POLICY "Portfolio images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolios');

CREATE POLICY "Providers can upload portfolio images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolios' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## 3. Environment Setup

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 4. Development

```bash
# Install dependencies (if needed)
npm install

# Start dev server
npm run dev
```

Server runs at: http://localhost:3000

---

## 5. Testing Flow

### Test Client Registration
1. Go to http://localhost:3000/auth/register
2. Click "I want to hire"
3. Fill form: Name, Email, Password
4. Submit → Check email for verification
5. Verify email (or disable verification in Supabase for dev)
6. Login → Should redirect to `/client/onboarding`
7. Complete 3 steps
8. Should redirect to `/client/dashboard`

### Test Provider Registration
1. Go to http://localhost:3000/auth/register
2. Click "I'm a Creative"
3. Fill form and submit
4. Verify email and login
5. Complete onboarding → Dashboard

---

## 6. Disable Email Verification (Dev Only)

For faster testing:
1. Supabase Dashboard → Authentication → Settings
2. Find "Confirm email" toggle
3. Disable it
4. Save

⚠️ **Re-enable for production!**

---

## Troubleshooting

### "Database error saving new user"
- Trigger not created → Run schema again
- Check Supabase Logs → Postgres Logs

### "Email not confirmed"
- Check email inbox
- Or disable email confirmation (see above)

### File upload fails
- Verify buckets exist
- Check bucket policies applied
- Verify bucket is public

### Infinite loop on Select
- Already fixed with Controller pattern
- If issue persists, check browser console

---

## Verification Commands

Run in Supabase SQL Editor:

```sql
-- Check profiles table
SELECT COUNT(*) FROM profiles;

-- Check provider profiles
SELECT COUNT(*) FROM provider_profiles;

-- Check trigger exists
SELECT * FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check storage buckets (via Dashboard → Storage)
```

---

## Quick Reference

| Route | Purpose |
|-------|---------|
| `/auth/register` | Sign up with role selection |
| `/auth/login` | Login |
| `/auth/reset-password` | Password reset |
| `/client/onboarding` | Hirer onboarding |
| `/provider/onboarding` | Influencer onboarding |
| `/client/dashboard` | Hirer dashboard |
| `/provider/dashboard` | Influencer dashboard |

---

**Ready to go! 🚀**

## Prerequisites

Before testing the authentication flow, ensure:

1. **Supabase Project is Set Up**
   - Database schema is applied (from `supabase-schema.sql`)
   - Storage buckets are created:
     - `avatars` (public)
     - `portfolios` (public)
   - RLS policies are enabled

2. **Environment Variables**
   - `.env.local` has:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     NEXT_PUBLIC_APP_URL=http://localhost:3000
     ```

3. **Storage Bucket Policies**
   
   Run these in Supabase SQL Editor after creating buckets:

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
   ```

## Testing the Flow

### Test 1: Client Registration & Onboarding

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/auth/register`

3. Click "I want to hire" card

4. Fill in the registration form:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"

5. Check your email for verification link (or check Supabase Auth dashboard)

6. After verification, go to `http://localhost:3000/auth/login`

7. Login with your credentials

8. You should be redirected to `/client/onboarding`

9. Complete the 3-step onboarding:
   - Step 1: Add phone, city, upload photo
   - Step 2: Add company name, industry, description
   - Step 3: Select influencer types and budget range

10. Click "Complete Setup"

11. You should be redirected to `/client/dashboard` with personalized greeting

### Test 2: Provider Registration & Onboarding

1. Navigate to `http://localhost:3000/auth/register`

2. Click "I'm a Creative" card

3. Fill in the registration form:
   - Full Name: "Jane Smith"
   - Email: "jane@example.com"
   - Password: "password123"

4. Verify email and login

5. You should be redirected to `/provider/onboarding`

6. Complete the 3-step onboarding:
   - Step 1: Add phone, city, bio, upload photo
   - Step 2: Select categories, experience, rates
   - Step 3: Add social URLs, upload portfolio images

7. Click "Complete Setup"

8. You should be redirected to `/provider/dashboard` with:
   - Personalized greeting
   - Category badges
   - Profile completeness (should be 100%)
   - Stats cards

### Test 3: Route Protection

1. While logged in as a client, try to access:
   - `/provider/dashboard` → Should redirect to home
   - `/client/dashboard` → Should work

2. While logged in as a provider, try to access:
   - `/client/dashboard` → Should redirect to home
   - `/provider/dashboard` → Should work

3. Logout and try to access:
   - `/client/dashboard` → Should redirect to login
   - `/provider/dashboard` → Should redirect to login

### Test 4: Profile Completeness

1. Login as a provider with incomplete profile

2. Try to access `/provider/dashboard` → Should redirect to onboarding

3. Complete onboarding

4. Try to access `/provider/onboarding` → Should redirect to dashboard

### Test 5: Password Reset

1. Go to `/auth/login`

2. Click "Forgot password?"

3. Enter your email

4. Check email for reset link

5. Click link → Should go to `/auth/reset-password`

6. Enter new password

7. Should redirect to login

8. Login with new password

## Common Issues & Solutions

### Issue: "Cannot find module '@/hooks/use-toast'"
**Solution:** Restart your IDE/editor to refresh TypeScript server

### Issue: File upload fails
**Solution:** 
- Check storage buckets exist in Supabase
- Verify bucket policies are applied
- Check file size (max 50MB by default)

### Issue: Middleware redirect loop
**Solution:**
- Clear browser cookies
- Check that profile data is being saved correctly
- Verify middleware logic matches your profile structure

### Issue: Email verification not working
**Solution:**
- Check Supabase Auth settings
- Verify email templates are configured
- For development, you can manually verify users in Supabase dashboard

### Issue: Profile data not showing on dashboard
**Solution:**
- Check browser console for errors
- Verify `useAuth` hook is fetching data
- Check Supabase RLS policies allow reading profiles

## Development Tips

1. **Use Supabase Studio** to inspect:
   - Auth users
   - Profile data
   - Storage files

2. **Check Browser DevTools**:
   - Network tab for API calls
   - Console for errors
   - Application tab for cookies

3. **Test with Multiple Browsers**:
   - Use incognito for fresh sessions
   - Test different roles simultaneously

4. **Monitor Middleware**:
   - Add console.logs in middleware for debugging
   - Check redirect URLs

## Next Steps

After successful testing:

1. Deploy to production
2. Configure production email templates
3. Set up proper email service (SendGrid, Resend, etc.)
4. Add analytics tracking
5. Monitor user onboarding completion rates
6. Gather user feedback on onboarding flow

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Check Supabase logs
4. Review the AUTHENTICATION_IMPLEMENTATION.md for details
