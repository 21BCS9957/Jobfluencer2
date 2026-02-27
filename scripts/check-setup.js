// Check setup status
require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')

console.log('🔍 Job Fluencer Setup Status Check\n')
console.log('=' .repeat(50))

let allGood = true

// Check 1: Environment file
console.log('\n📄 Environment Variables:')
if (!fs.existsSync('.env.local')) {
  console.log('   ❌ .env.local file not found')
  allGood = false
} else {
  console.log('   ✅ .env.local file exists')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
    console.log('   ❌ NEXT_PUBLIC_SUPABASE_URL not configured')
    allGood = false
  } else {
    console.log('   ✅ NEXT_PUBLIC_SUPABASE_URL configured')
  }
  
  if (!supabaseKey || supabaseKey === 'your_anon_key') {
    console.log('   ❌ NEXT_PUBLIC_SUPABASE_ANON_KEY not configured')
    allGood = false
  } else {
    console.log('   ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY configured')
  }
}

// Check 2: Required files
console.log('\n📁 Required Files:')
const requiredFiles = [
  'src/lib/supabase/client.ts',
  'src/lib/supabase/server.ts',
  'src/middleware.ts',
  'src/lib/types/database.ts',
  'supabase-schema.sql'
]

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`)
  } else {
    console.log(`   ❌ ${file} missing`)
    allGood = false
  }
})

// Check 3: Dependencies
console.log('\n📦 Key Dependencies:')
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const requiredDeps = [
  '@supabase/ssr',
  '@supabase/supabase-js',
  'next',
  'react',
  'zod',
  'react-hook-form'
]

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`   ✅ ${dep}`)
  } else {
    console.log(`   ❌ ${dep} missing`)
    allGood = false
  }
})

// Check 4: Folder structure
console.log('\n📂 Folder Structure:')
const requiredDirs = [
  'src/app/auth',
  'src/app/client',
  'src/app/provider',
  'src/components/ui',
  'src/lib/supabase',
  'src/actions',
  'src/hooks'
]

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`   ✅ ${dir}`)
  } else {
    console.log(`   ❌ ${dir} missing`)
    allGood = false
  }
})

// Summary
console.log('\n' + '='.repeat(50))
if (allGood) {
  console.log('\n✅ All checks passed!')
  console.log('\n📋 Next steps:')
  console.log('   1. Update .env.local with your Supabase credentials')
  console.log('   2. Run: npm run test:supabase')
  console.log('   3. Run: npm run generate:types')
  console.log('   4. Run: npm run dev')
} else {
  console.log('\n⚠️  Some checks failed. Please review the issues above.')
  console.log('\n📖 See SUPABASE_SETUP_GUIDE.md for detailed instructions')
}

console.log('\n' + '='.repeat(50) + '\n')
