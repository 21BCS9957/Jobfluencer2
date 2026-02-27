// Test Supabase connection
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...\n')

if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL is not set in .env.local')
  console.log('\nPlease update .env.local with your Supabase credentials:')
  console.log('1. Go to https://supabase.com/dashboard')
  console.log('2. Select your project')
  console.log('3. Go to Settings > API')
  console.log('4. Copy the URL and anon key to .env.local\n')
  process.exit(1)
}

if (!supabaseKey || supabaseKey === 'your_anon_key') {
  console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in .env.local')
  process.exit(1)
}

console.log('✅ Environment variables found')
console.log(`📍 Supabase URL: ${supabaseUrl}`)
console.log(`🔑 Anon Key: ${supabaseKey.substring(0, 20)}...`)
console.log('')

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('🔌 Attempting to connect to Supabase...')
    
    // Test connection by querying profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('❌ Connection failed:', error.message)
      console.log('\nPossible issues:')
      console.log('1. Have you run the SQL schema in Supabase SQL Editor?')
      console.log('2. Check if your credentials are correct')
      console.log('3. Verify your project is active\n')
      process.exit(1)
    }
    
    console.log('✅ Successfully connected to Supabase!')
    console.log('✅ Database schema is set up correctly')
    console.log('\n🎉 You can now run: npm run dev\n')
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message)
    process.exit(1)
  }
}

testConnection()
