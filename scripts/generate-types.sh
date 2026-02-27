#!/bin/bash

# Script to generate TypeScript types from Supabase

# Check if .env.local exists and has Supabase URL
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    exit 1
fi

# Extract Supabase URL from .env.local
SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d '=' -f2)

if [ -z "$SUPABASE_URL" ] || [ "$SUPABASE_URL" = "your_supabase_url" ]; then
    echo "❌ Please set NEXT_PUBLIC_SUPABASE_URL in .env.local"
    echo ""
    echo "Get your Supabase URL from:"
    echo "https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api"
    exit 1
fi

# Extract project ID from URL (format: https://xxxxx.supabase.co)
PROJECT_ID=$(echo $SUPABASE_URL | sed -E 's|https://([^.]+)\.supabase\.co|\1|')

echo "🔍 Found Supabase Project ID: $PROJECT_ID"
echo ""
echo "📝 Generating TypeScript types..."
echo ""

# Generate types
npx supabase gen types typescript --project-id "$PROJECT_ID" --schema public > src/lib/types/database.ts

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ TypeScript types generated successfully!"
    echo "📁 File: src/lib/types/database.ts"
else
    echo ""
    echo "❌ Failed to generate types. Please check:"
    echo "1. Your Supabase project ID is correct"
    echo "2. You have run the SQL schema in Supabase"
    echo "3. You have network access to Supabase"
fi
