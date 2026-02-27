-- COMPLETE SUPABASE SCHEMA FOR JOB FLUENCER
-- Run this in your Supabase SQL Editor

-- ENUMS
CREATE TYPE user_role AS ENUM ('client', 'provider', 'admin');
CREATE TYPE kyc_status AS ENUM ('pending', 'submitted', 'approved', 'rejected');
CREATE TYPE project_status AS ENUM ('open', 'matched', 'in_progress', 'completed', 'cancelled');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'disputed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('deposit_paid', 'fully_paid', 'refunded', 'pending');
CREATE TYPE category_type AS ENUM ('photography', 'videography', 'social_media', 'editing', 'influencer', 'content_creation');
CREATE TYPE notification_type AS ENUM ('booking', 'message', 'payment', 'kyc', 'match', 'review', 'general');

-- PROFILES
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'client',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  phone TEXT,
  city TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROVIDER PROFILES
CREATE TABLE provider_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  categories category_type[] NOT NULL DEFAULT '{}',
  portfolio_urls TEXT[] DEFAULT '{}',
  portfolio_image_urls TEXT[] DEFAULT '{}',
  years_experience INT DEFAULT 0,
  hourly_rate DECIMAL(10,2),
  daily_rate DECIMAL(10,2),
  is_available BOOLEAN DEFAULT TRUE,
  instagram_url TEXT,
  youtube_url TEXT,
  website_url TEXT,
  kyc_status kyc_status DEFAULT 'pending',
  kyc_document_url TEXT,
  kyc_rejection_reason TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  total_projects INT DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  razorpay_contact_id TEXT,
  razorpay_fund_account_id TEXT,
  bank_account_number TEXT,
  bank_ifsc TEXT,
  bank_account_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECTS
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category category_type NOT NULL,
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  location TEXT,
  is_remote BOOLEAN DEFAULT FALSE,
  event_date DATE,
  duration_hours INT,
  status project_status DEFAULT 'open',
  requirements JSONB DEFAULT '{}',
  skills_needed TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MATCH REQUESTS
CREATE TABLE match_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id),
  matched_provider_ids UUID[] DEFAULT '{}',
  match_scores JSONB DEFAULT '{}',
  match_reasons JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROVIDER INTEREST
CREATE TABLE project_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  cover_note TEXT,
  proposed_rate DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, provider_id)
);

-- BOOKINGS
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  client_id UUID NOT NULL REFERENCES profiles(id),
  provider_id UUID NOT NULL REFERENCES profiles(id),
  status booking_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2) NOT NULL,
  remaining_amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  razorpay_order_id_deposit TEXT,
  razorpay_payment_id_deposit TEXT,
  razorpay_order_id_remaining TEXT,
  razorpay_payment_id_remaining TEXT,
  scheduled_date DATE,
  scheduled_time TEXT,
  delivery_deadline DATE,
  notes TEXT,
  client_work_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES profiles(id),
  provider_id UUID REFERENCES profiles(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  attachment_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type notification_type DEFAULT 'general',
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRIGGER: auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client')
  );
  
  IF (NEW.raw_user_meta_data->>'role') = 'provider' THEN
    INSERT INTO provider_profiles (id, categories)
    VALUES (NEW.id, '{}');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- TRIGGER: auto-update provider rating
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE provider_profiles
  SET 
    rating = (SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE provider_id = NEW.provider_id),
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE provider_id = NEW.provider_id)
  WHERE id = NEW.provider_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_created
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE PROCEDURE update_provider_rating();

-- TRIGGER: updated_at auto-update
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER set_updated_at_bookings 
  BEFORE UPDATE ON bookings 
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER set_updated_at_projects 
  BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER set_updated_at_provider_profiles 
  BEFORE UPDATE ON provider_profiles 
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_requests ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users update own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Provider profiles viewable by everyone" 
  ON provider_profiles FOR SELECT USING (true);

CREATE POLICY "Providers update own profile" 
  ON provider_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Projects viewable by everyone" 
  ON projects FOR SELECT USING (true);

CREATE POLICY "Clients create projects" 
  ON projects FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients update own projects" 
  ON projects FOR UPDATE USING (auth.uid() = client_id);

CREATE POLICY "Bookings visible to parties" 
  ON bookings FOR ALL USING (
    auth.uid() = client_id OR auth.uid() = provider_id
  );

CREATE POLICY "Reviews viewable by everyone" 
  ON reviews FOR SELECT USING (true);

CREATE POLICY "Clients create reviews" 
  ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Messages visible to booking parties" 
  ON messages FOR ALL USING (
    auth.uid() IN (
      SELECT client_id FROM bookings WHERE id = booking_id
      UNION
      SELECT provider_id FROM bookings WHERE id = booking_id
    )
  );

CREATE POLICY "Users see own notifications" 
  ON notifications FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Project interests visible to project client and provider" 
  ON project_interests FOR ALL USING (
    auth.uid() = provider_id OR 
    auth.uid() IN (SELECT client_id FROM projects WHERE id = project_id)
  );

CREATE POLICY "Providers create interests" 
  ON project_interests FOR INSERT WITH CHECK (auth.uid() = provider_id);

-- STORAGE BUCKETS
-- Create these in Supabase Dashboard > Storage:
-- 1. "avatars" → Public bucket
-- 2. "portfolios" → Public bucket  
-- 3. "kyc-documents" → Private bucket (only service role can read)

-- After creating buckets, run these policies:

-- Avatars bucket policies
-- CREATE POLICY "Avatar images are publicly accessible"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'avatars');

-- CREATE POLICY "Users can upload their own avatar"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can update their own avatar"
--   ON storage.objects FOR UPDATE
--   USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Portfolios bucket policies
-- CREATE POLICY "Portfolio images are publicly accessible"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'portfolios');

-- CREATE POLICY "Providers can upload portfolio images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'portfolios' AND auth.uid()::text = (storage.foldername(name))[1]);

-- KYC documents bucket policies (private)
-- CREATE POLICY "Only service role can access KYC documents"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'kyc-documents' AND auth.role() = 'service_role');

-- CREATE POLICY "Providers can upload their KYC documents"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'kyc-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
