export const ROLE_SUGGESTIONS = [
  'Photographer',
  'Videographer',
  'Graphic Designer',
  'Content Writer',
  'Social Media Manager',
  'UI/UX Designer',
  'Video Editor',
  'Influencer',
  'SEO Expert',
  '3D Artist',
  'Copywriter',
  'Data Analyst',
  'Brand Strategist',
  'Animator',
  'Podcast Editor',
  'Motion Designer',
  'Virtual Assistant',
  'Mobile Developer',
  'Product Manager',
  'Web Developer',
]

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
] as const

export const HIRE_TYPES = [
  {
    value: 'one-time',
    label: 'One-Time Project',
    icon: '⚡',
    description: 'Single deliverable, defined scope',
  },
  {
    value: 'part-time',
    label: 'Part-Time',
    icon: '🕐',
    description: 'A few hours/week, flexible schedule',
  },
  {
    value: 'full-time',
    label: 'Full-Time',
    icon: '💼',
    description: 'Dedicated resource, long-term engagement',
  },
  {
    value: 'retainer',
    label: 'Monthly Retainer',
    icon: '📅',
    description: 'Fixed monthly fee, ongoing work',
  },
] as const

export const BUDGET_TYPES = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'range', label: 'Price Range' },
  { value: 'hourly', label: 'Hourly Rate' },
] as const
